"use client";

import { motion } from "framer-motion";

type Item = { number: string; title: string };

// Eight ring slots, indexed clockwise starting at the top. Whichever item is
// active always sits in slot 0 — the rest fall in behind it in order, so
// picking a box visibly rotates the whole ring instead of just re-styling it.
const SLOTS = [
  { top: "12%", left: "50%" }, // 0 top — active
  { top: "23%", left: "74%" }, // 1
  { top: "50%", left: "84%" }, // 2
  { top: "77%", left: "74%" }, // 3
  { top: "88%", left: "50%" }, // 4
  { top: "77%", left: "26%" }, // 5
  { top: "50%", left: "16%" }, // 6
  { top: "23%", left: "26%" }, // 7
];

/**
 * The rotating ring of business tiles, shared between "Our Business" and the
 * hero. Purely controlled — the caller owns `active` (and its auto-advance
 * timer, if any) so the same ring can drive a synced side-panel in one place
 * and sit on its own elsewhere, always at the exact same size.
 */
export default function BusinessRing({
  items,
  active,
  onSelect,
  glideSeconds = 0.6,
  glideEase = [0.22, 1, 0.36, 1],
  responsive = false,
}: {
  items: Item[];
  active: number;
  onSelect: (index: number) => void;
  /** How long each tile takes to glide to its new slot. Set this close to
   * the caller's auto-advance interval for a ring that's always gliding —
   * never snapping into place and sitting still. */
  glideSeconds?: number;
  /** "linear" reads as constant, unbroken motion for a continuously-gliding
   * ring; the default eased curve suits a quick snap-then-settle instead. */
  glideEase?: "linear" | number[];
  /** Our Business hides the ring below lg (a plain list stands in instead,
   * rendered by the caller) and uses a fixed height sized for that section's
   * wide column. The hero has no such fallback, so it opts into this instead:
   * always visible, and aspect-square rather than a fixed height so the
   * circle geometry still holds at any container width, mobile included. */
  responsive?: boolean;
}) {
  const count = items.length;

  return (
    <div
      className={
        responsive
          ? "relative mx-auto aspect-square w-full max-w-[460px]"
          : "relative hidden h-[460px] w-full lg:block"
      }
    >
      <div className="absolute inset-x-[14%] inset-y-[12%] rounded-full border border-cream-100/10" />
      {items.map((it, i) => {
        const slot = (i - active + count) % count;
        const pos = SLOTS[slot]!;
        const isActive = slot === 0;
        return (
          <motion.button
            key={it.number}
            onClick={() => onSelect(i)}
            initial={false}
            animate={{
              top: pos.top,
              left: pos.left,
              scale: isActive ? 1 : 0.88,
            }}
            transition={{ duration: glideSeconds, ease: glideEase }}
            style={{ zIndex: isActive ? 20 : 10 - slot, x: "-50%", y: "-50%" }}
            className={`absolute w-[32%] rounded-xl p-2 text-start shadow-xl transition-colors duration-500 sm:p-4 ${
              isActive
                ? "bg-gold-400 text-pine-950"
                : "border border-cream-100/10 bg-cream-100/[0.06] text-cream-100/70 backdrop-blur-sm hover:bg-cream-100/10"
            }`}
          >
            <span
              className={`font-mono text-[8px] tracking-[0.2em] sm:text-[10px] ${
                isActive ? "text-pine-900/60" : "text-gold-400/70"
              }`}
            >
              {it.number}
            </span>
            <div className="mt-1 font-display text-[11px] leading-tight sm:text-sm lg:text-base">
              {it.title}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
