import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-xl border border-line bg-surface p-10 text-center">
      <h1 className="font-display text-3xl">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm text-zinc-600">Destinasi atau halaman yang kamu cari tidak ada dalam dataset.</p>
      <Link href="/destinations" className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark">
        Buka Direktori
      </Link>
    </div>
  );
}
