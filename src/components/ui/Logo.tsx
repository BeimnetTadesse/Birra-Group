import Image from "next/image";

export default function LogoMark({ className = "h-7" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center rounded-lg overflow-hidden ${className}`}
      style={{ aspectRatio: "1036/462" }}
    >
      <Image
        src="/images/logo-full.png"
        alt="Birra Group"
        fill
        sizes="120px"
        loading="eager"
        className="object-contain"
      />
    </span>
  );
}
