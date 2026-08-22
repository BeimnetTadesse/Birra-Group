import "server-only";

/**
 * Live ICE Arabica coffee price — the international reference for arabica.
 *
 * This is deliberately NOT Birra's selling price. Ethiopian lots trade above or
 * below the benchmark depending on origin, grade, processing and volume, so the
 * UI must always say so.
 *
 * ── Why the symbols matter ──────────────────────────────────────────────────
 * CNBC quotes a specific delivery month (currently KCZ6 = December 2026).
 * Yahoo's `KC=F` is a *continuous front-month* series that splices consecutive
 * contracts together, so its history belongs to a different instrument than the
 * quote — on one sample its series read 358.75 while the live contract was
 * 324.90. Charting one against the other produced a -10.64% day change where
 * the real move was -1.34%.
 *
 * The fix is to derive Yahoo's contract-specific symbol (KCZ26.NYB) from CNBC's
 * own contract code, so quote and history describe the same instrument.
 * Verified: that series' last close (322.65) equals CNBC's settlePrice for the
 * same date.
 */

export type PricePoint = { date: string; close: number };

export type CoffeePrice = {
  /** US cents per pound, as quoted by ICE. */
  centsPerLb: number;
  changeCents: number | null;
  changePercent: number | null;
  /** Prior session close. Reconciles with changeCents by construction. */
  previousCloseCents: number | null;
  /** Human label, e.g. "Coffee (Dec'26)". */
  contract: string | null;
  /** Exchange contract code, e.g. "KCZ6". */
  contractCode: string | null;
  /** Daily closes for the same contract. Empty when history is unavailable. */
  history: PricePoint[];
  source: "CNBC" | "Yahoo Finance";
  fetchedAt: string;
};

const TIMEOUT_MS = 6_000;
const REVALIDATE_SECONDS = 3_600; // one hour

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BirraSite/1.0)" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } finally {
    clearTimeout(timer);
  }
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;
  const n = Number(value.replace(/[%,\s]/g, ""));
  return Number.isFinite(n) ? n : null;
}

/**
 * Turn CNBC's contract code into Yahoo's symbol for the same contract.
 * "KCZ6" + expiry 2026-12-18 → "KCZ26.NYB". CNBC abbreviates the year to one
 * digit, so the full year comes from the expiration date rather than a guess.
 */
function yahooSymbolFor(altSymbol: unknown, expiration: unknown): string | null {
  if (typeof altSymbol !== "string") return null;
  const match = altSymbol.match(/^KC([FGHJKMNQUVXZ])\d$/); // month code, 1-digit year
  if (!match) return null;
  const year =
    typeof expiration === "string" && /^\d{4}-/.test(expiration)
      ? expiration.slice(2, 4)
      : null;
  return year ? `KC${match[1]}${year}.NYB` : null;
}

/** Daily closes for one specific contract. Never throws — history is optional. */
async function fetchHistory(symbol: string): Promise<PricePoint[]> {
  try {
    const response = await fetchWithTimeout(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1mo`,
    );
    if (!response.ok) return [];

    const result = (await response.json())?.chart?.result?.[0];
    const stamps: number[] = result?.timestamp ?? [];
    const closes: (number | null)[] = result?.indicators?.quote?.[0]?.close ?? [];

    return stamps
      .map((t, i) => ({ t, c: closes[i] }))
      .filter((p): p is { t: number; c: number } => typeof p.c === "number")
      .map(({ t, c }) => ({
        date: new Date(t * 1000).toISOString().slice(0, 10),
        close: c,
      }));
  } catch {
    return [];
  }
}

async function fromCnbc(): Promise<CoffeePrice | null> {
  const url =
    "https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol" +
    "?symbols=%40KC.1&requestMethod=itv&noform=1&partnerId=2&fund=1" +
    "&exthrs=1&output=json&events=1";

  const response = await fetchWithTimeout(url);
  if (!response.ok) return null;

  const quote = (await response.json())?.FormattedQuoteResult?.FormattedQuote?.[0];
  const price = toNumber(quote?.last);
  if (price === null || price <= 0) return null;

  const symbol = yahooSymbolFor(quote?.altSymbol, quote?.expiration_date);
  const history = symbol ? await fetchHistory(symbol) : [];

  return {
    centsPerLb: price,
    changeCents: toNumber(quote?.change),
    changePercent: toNumber(quote?.change_pct),
    // CNBC also exposes `settlePrice`, which differs from this. The displayed
    // change is computed from previous_day_closing, so use the same figure or
    // the card would contradict itself.
    previousCloseCents: toNumber(quote?.previous_day_closing),
    contract: typeof quote?.name === "string" ? quote.name : null,
    contractCode: typeof quote?.altSymbol === "string" ? quote.altSymbol : null,
    history,
    source: "CNBC",
    fetchedAt: new Date().toISOString(),
  };
}

/** Last resort: price only, from the continuous series. */
async function fromYahoo(): Promise<CoffeePrice | null> {
  const response = await fetchWithTimeout(
    "https://query1.finance.yahoo.com/v8/finance/chart/KC=F?interval=1d&range=5d",
  );
  if (!response.ok) return null;

  const meta = (await response.json())?.chart?.result?.[0]?.meta;
  const price = toNumber(meta?.regularMarketPrice);
  if (price === null || price <= 0) return null;

  return {
    centsPerLb: price,
    // Everything below is omitted rather than guessed: this is the spliced
    // continuous series, so its history and prior close belong to a different
    // contract than the quote. The card hides these fields when null.
    changeCents: null,
    changePercent: null,
    previousCloseCents: null,
    contract: typeof meta?.shortName === "string" ? meta.shortName : null,
    contractCode: null,
    history: [],
    source: "Yahoo Finance",
    fetchedAt: new Date().toISOString(),
  };
}

/** Returns the benchmark, or null if every provider fails. */
export async function getCoffeePrice(): Promise<CoffeePrice | null> {
  for (const provider of [fromCnbc, fromYahoo]) {
    try {
      const price = await provider();
      if (price) return price;
      console.warn(`[market-price] ${provider.name} returned no usable quote`);
    } catch (error) {
      console.warn(`[market-price] ${provider.name} failed`, error);
    }
  }
  console.error("[market-price] all providers failed — hiding the section");
  return null;
}
