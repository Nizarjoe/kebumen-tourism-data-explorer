import Link from "next/link";
import { destinasi, countBy, fmtInt } from "@/lib/data";
import { KATEGORI_LIST, KATEGORI_COLORS } from "@/lib/types";
import CategoryBarChart from "@/components/CategoryBarChart";
import KecamatanBarChart from "@/components/KecamatanBarChart";

const BUILD_DATE = "2026-11-11";

export default function Overview() {
  const total = destinasi.length;
  const kecamatanCount = new Set(destinasi.map((d) => d.kecamatan)).size;
  const kategoriCount = countBy(destinasi, (d) => d.kategori);
  const withCoords = destinasi.filter((d) => d.lat != null && d.lon != null).length;
  const kecCounts = countBy(destinasi, (d) => d.kecamatan);

  const kpis = [
    { label: "Record destinasi", value: fmtInt(total), note: "Dari 2 sumber resmi pemkab" },
    { label: "Kecamatan tercakup", value: fmtInt(kecamatanCount), note: "Dari 26 kecamatan resmi" },
    { label: "Kategori", value: fmtInt(KATEGORI_LIST.length), note: "Alam & Buatan, Sejarah, Desa Wisata" },
    { label: "Kelengkapan koordinat", value: `${fmtInt(withCoords)} / ${fmtInt(total)}`, note: "Geokode OpenStreetMap" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <section className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">Dashboard eksplorasi data</p>
        <h1 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">Jelajahi data destinasi wisata Kebumen</h1>
        <p className="mt-4 max-w-2xl text-zinc-700">
          Dataset destinasi wisata Kabupaten Kebumen, Jawa Tengah — dikompilasi dari katalog resmi Disparbud Kebumen dan
          Portal Pemkab Kebumen, lalu digeokode terhadap OpenStreetMap. Eksplorasi lewat peta, direktori, dan analisis wilayah.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600">
          <span>Tanggal kompilasi: <strong className="text-ink">{BUILD_DATE}</strong></span>
          <span>Sumber utama: <strong className="text-ink">Disparbud Kebumen · kebumenkab.go.id</strong></span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/map" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark">
            Jelajahi Peta
          </Link>
          <Link href="/destinations" className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-sand/50">
            Buka Direktori
          </Link>
          <Link href="/data-methodology" className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-sand/50">
            Lihat Metodologi
          </Link>
        </div>
      </section>

      {/* KPI */}
      <section aria-label="Statistik utama" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-sm text-zinc-600">{k.label}</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">{k.value}</p>
            <p className="mt-1 text-xs text-zinc-500">{k.note}</p>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-display text-xl">Komposisi kategori</h2>
          <p className="mt-1 text-sm text-zinc-600">Jumlah record destinasi per kategori pada dataset.</p>
          <CategoryBarChart data={kategoriCount} colors={KATEGORI_COLORS} />
          <p className="mt-3 text-xs text-zinc-500">
            Sumber: kompilasi Disparbud & Pemkab Kebumen, akses {BUILD_DATE}. Jumlah record ≠ popularitas.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-5">
          <h2 className="font-display text-xl">Record per kecamatan</h2>
          <p className="mt-1 text-sm text-zinc-600">Distribusi record destinasi berdasarkan kecamatan lokasi.</p>
          <KecamatanBarChart data={kecCounts} />
          <p className="mt-3 text-xs text-zinc-500">
            Kecamatan tanpa record belum muncul pada dataset — bukan berarti tidak memiliki destinasi.
          </p>
        </div>
      </section>

      {/* Catatan kualitas */}
      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Catatan kualitas data</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>{fmtInt(total - withCoords)} record belum memiliki koordinat tervalidasi dan tidak ditampilkan di peta.</li>
          <li>Attribut tiket/fasilitas hanya terisi pada record yang mempublikasikannya; kolom kosong ditandai, tidak diisi tebakan.</li>
          <li>Dataset bersifat kompilasi, bukan statistik resmi kunjungan wisata.</li>
        </ul>
        <Link href="/data-methodology" className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2">
          Baca metodologi lengkap →
        </Link>
      </section>
    </div>
  );
}
