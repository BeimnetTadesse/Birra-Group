import Image from "next/image";

/**
 * The mark sits still at the center while a dashed orbit ring — with one gold
 * arc and a travelling dot — turns slowly around it. Pure CSS/SVG, no JS: the
 * ring is a plain animate-spin-slow rotation, so it costs nothing at render
 * and respects prefers-reduced-motion via motion-reduce:animate-none.
 */
export default function LogoMark({ className = "h-10" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ aspectRatio: "1/1" }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="#f7f2e6"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="1 4"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#f7f2e6" strokeOpacity="0.15" strokeWidth="0.75" />
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="#efa924"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeDasharray="70 225.35"
          strokeDashoffset="-140"
        />
        <circle cx="50" cy="50" r="3" fill="#f7f2e6" transform="rotate(150 50 50) translate(0 -47)" />
      </svg>

      <span
        className="relative w-[52%] overflow-hidden rounded-lg bg-cream-100"
        style={{ aspectRatio: "280/340" }}
      >
        <Image
          src="/images/logo-bean.png"
          alt="Birra Group"
          fill
          sizes="80px"
          loading="eager"
          className="object-contain"
        />
      </span>
    </span>
  );
}
