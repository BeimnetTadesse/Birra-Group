// Deterministic pseudo-QR pattern for demo purposes (not a scannable code).
// Renders consistently per `seed` so switching demo lots visibly updates the pattern.
function hashSeed(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GRID = 17;
const FINDER = 5;

function isFinderZone(x: number, y: number) {
  const zones = [
    [0, 0],
    [GRID - FINDER, 0],
    [0, GRID - FINDER],
  ];
  return zones.some(([zx, zy]) => x >= zx && x < zx + FINDER && y >= zy && y < zy + FINDER);
}

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={FINDER} height={FINDER} fill="#0b1e14" />
      <rect x={1} y={1} width={FINDER - 2} height={FINDER - 2} fill="#fff" />
      <rect x={2} y={2} width={FINDER - 4} height={FINDER - 4} fill="#0b1e14" />
    </g>
  );
}

export default function QrPattern({
  seed,
  className = "",
}: {
  seed: string;
  className?: string;
}) {
  const rand = mulberry32(hashSeed(seed));
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < GRID; y++) {
    for (let x = 0; x < GRID; x++) {
      if (isFinderZone(x, y)) continue;
      if (rand() > 0.56) cells.push({ x, y });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${GRID} ${GRID}`}
      className={className}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`QR code placeholder for ${seed}`}
    >
      <rect width={GRID} height={GRID} fill="#fff" />
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={1} height={1} fill="#0b1e14" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={GRID - FINDER} y={0} />
      <Finder x={0} y={GRID - FINDER} />
    </svg>
  );
}
