import Link from "next/link";
import { destinasi, countBy, fmtInt } from "@/lib/data";
import KecamatanBarChart from "@/components/KecamatanBarChart";
import StackedKecamatanChart from "@/components/StackedKecamatanChart";

const BUILD_DATE = "2026-11-11";

export const metadata = {
  title: "Analisis Wilayah — Kebumen Tourism Data Explorer",
  description: "Perbandingan distribusi record destinasi wisata per kecamatan dan kategori.",
};

export default function AnalysisPage() {
  const kecCounts = countBy(destinasi, (d) => d.kecamatan);
  const katList = [...new Set(destinasi.map((d) => d.kategori))];
  const kecamatanList = [...new Set(destinasi.map((d) => d.kecamatan).filter((k): k is string => !!k))].sort();

  const stacked: Record<string, Record<string, number>> = {};
  for (const k of kecamatanList) {
    stacked[k] = {};
    for (const kat of katList) stacked[k][kat] = 0;
  }
  for (const d of destinasi) {
    if (d.kecamatan) stacked[d.kecamatan][d.kategori] = (stacked[d.kecamatan][d.kategori] ?? 0) + 1;
  }

  const noCoords = destinasi.filter((d) => d.lat == null || d.lon == null);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl">Analisis Wilayah</h1>
        <p className="mt-1 max-w-2xl text-zinc-600">
          Perbandingan distribusi <em>record</em> destinasi per kecamatan dan kategori. Jumlah record mencerminkan
          kuantitas publikasi pada sumber — <strong className="text-ink">bukan jumlah kunjungan, popularitas, atau kualitas</strong> destinasi.
        </p>
      </div>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Record per kecamatan</h2>
        <p className="mt-1 text-sm text-zinc-600">Perbandingan jumlah record destinasi antar kecamatan (urut terbanyak).</p>
        <KecamatanBarChart data={kecCounts} />
        <p className="mt-3 text-xs text-zinc-500">Sumber: kompilasi Disparbud & Pemkab Kebumen, akses {BUILD_DATE}.</p>
      </section>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Komposisi kategori per kecamatan</h2>
        <p className="mt-1 text-sm text-zinc-600">Stacked bar kategori di dalam tiap kecamatan.</p>
        <StackedKecamatanChart data={stacked} katList={katList} />
      </section>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Tabel angka</h2>
        <p className="mt-1 text-sm text-zinc-600">Angka persis di balik grafik di atas.</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Tabel record per kecamatan per kategori</caption>
            <thead>
              <tr className="border-b border-line text-left text-zinc-500">
                <th scope="col" className="py-2 pr-4">Kecamatan</th>
                {katList.map((k) => <th key={k} scope="col" className="py-2 pr-4">{k}</th>)}
                <th scope="col" className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {kecamatanList.map((k) => (
                <tr key={k} className="border-b border-line">
                  <th scope="row" className="py-2 pr-4 font-medium">{k}</th>
                  {katList.map((kat) => <td key={kat} className="py-2 pr-4">{stacked[k][kat]}</td>)}
                  <td className="py-2 font-semibold">{kecCounts[k]}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <th scope="row" className="py-2 pr-4">Total</th>
                {katList.map((kat) => (
                  <td key={kat} className="py-2 pr-4">{destinasi.filter((d) => d.kategori === kat).length}</td>
                ))}
                <td className="py-2">{fmtInt(destinasi.length)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Catatan metodologi &amp; keterbatasan</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>Peta tematik choropleth belum disertakan — geometri batas kecamatan masih dalam proses validasi agar tidak ada join keliru.</li>
          <li>{noCoords.length} record belum memiliki koordinat tervalidasi; analisis spasial titik hanya mencakup {fmtInt(destinasi.length - noCoords.length)} record.</li>
          <li>Cakupan dataset = destinasi yang dipublikasikan sumber resmi saat tanggal akses; destinasi yang tidak dipublikasikan tidak terwakili.</li>
        </ul>
        <Link href="/data-methodology" className="mt-3 inline-block text-sm font-medium text-accent underline underline-offset-2">
          Baca metodologi lengkap →
        </Link>
      </section>
    </div>
  );
}
