import Image from "next/image";

export default function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-lg bg-cream-50 p-1.5 ${className}`}
    >
      <Image
        src="/images/logo-mark.png"
        alt="Birra Group"
        fill
        sizes="48px"
        className="object-contain"
      />
    </span>
  );
}
