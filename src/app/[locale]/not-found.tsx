export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-pine-900 px-6 text-center">
      <div className="font-display text-6xl text-gold-400">404</div>
      <p className="mt-4 text-cream-100/70">
        This page has wandered off. Head back{" "}
        <a href="/" className="text-gold-400 underline underline-offset-4">
          home
        </a>
        .
      </p>
    </div>
  );
}
