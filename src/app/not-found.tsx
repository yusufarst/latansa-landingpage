import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center gap-6 px-6 py-16 xs:px-8 md:px-16">
      <p className="text-sm tracking-[0.2em] text-text-muted uppercase">404</p>
      <h1 className="font-display text-4xl leading-tight md:text-5xl">
        Halaman tidak ditemukan.
      </h1>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center border-b border-ink text-base"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
