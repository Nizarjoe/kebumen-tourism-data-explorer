import Link from "next/link";

export const metadata = {
  title: "Tentang Proyek — Kebumen Tourism Data Explorer",
  description: "Tujuan, pembuat, dan teknologi di balik Kebumen Tourism Data Explorer.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-display text-3xl">Tentang Proyek</h1>
      </div>

      <section className="rounded-xl border border-line bg-surface p-6 text-sm leading-relaxed text-zinc-700">
        <h2 className="font-display text-xl text-ink">Tujuan</h2>
        <p className="mt-2">
          <strong className="text-ink">Kebumen Tourism Data Explorer</strong> adalah proyek portofolio sains data yang
          mendemonstrasikan alur end-to-end: pengumpulan data dari sumber resmi, pembersihan &amp; deduplikasi,
          geokoding tervalidasi, hingga penyajian lewat dashboard web yang jujur terhadap datanya — tanpa angka,
          koordinat, atau insight karangan.
        </p>
      </section>

      <section className="rounded-xl border border-line bg-surface p-6 text-sm leading-relaxed text-zinc-700">
        <h2 className="font-display text-xl text-ink">Teknologi</h2>
        <ul className="mt-2 list-disc pl-5">
          <li>Next.js (App Router) + TypeScript — frontend &amp; static generation</li>
          <li>Tailwind CSS — design system &quot;Modern Civic Data&quot;</li>
          <li>Leaflet + react-leaflet — peta interaktif</li>
          <li>Chart.js + react-chartjs-2 — visualisasi</li>
          <li>Python (kompilasi data) + OpenStreetMap Overpass/Nominatim — geokode</li>
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-surface p-6 text-sm leading-relaxed text-zinc-700">
        <h2 className="font-display text-xl text-ink">Pembuat</h2>
        <p className="mt-2">Muhammad Nizar Asagaf — mahasiswa Sains Data.</p>
        <p className="mt-2">
          <a className="text-accent underline underline-offset-2" href="https://github.com/Nizarjoe" target="_blank" rel="noopener noreferrer">
            GitHub: Nizarjoe
          </a>
        </p>
      </section>

      <p className="text-sm">
        <Link href="/" className="text-accent underline underline-offset-2">← Kembali ke Overview</Link>
      </p>
    </div>
  );
}
