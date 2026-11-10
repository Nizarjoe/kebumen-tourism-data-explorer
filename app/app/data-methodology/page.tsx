import { destinasi, fmtInt } from "@/lib/data";
import { countBy } from "@/lib/data";

const BUILD_DATE = "2026-11-11";

export const metadata = {
  title: "Dataset & Metodologi — Kebumen Tourism Data Explorer",
  description: "Sumber data, kamus data, preprocessing, dan keterbatasan dataset destinasi wisata Kebumen.",
};

const SOURCES = [
  {
    name: "Disparbud Kabupaten Kebumen — Katalog Destinasi Wisata",
    url: "https://disparbud.kebumenkab.go.id/index.php/web/category",
    coverage: "18 destinasi (Wisata Alam & Buatan, Desa Wisata)",
  },
  {
    name: "Portal Pemkab Kebumen — Potensi Daerah / Wisata",
    url: "https://www.kebumenkab.go.id/index.php/web/wisata",
    coverage: "6 destinasi dengan detail tiket, jam buka, fasilitas, kontak",
  },
  {
    name: "OpenStreetMap (Overpass API + Nominatim)",
    url: "https://www.openstreetmap.org",
    coverage: "Geokode koordinat (viewbox dibatasi wilayah Kebumen)",
  },
];

const MISSING = [
  ["Tiket masuk", destinasi.filter((d) => !d.tiket_masuk).length],
  ["Jam buka", destinasi.filter((d) => !d.jam_buka).length],
  ["Alamat", destinasi.filter((d) => !d.alamat).length],
  ["Fasilitas", destinasi.filter((d) => d.fasilitas.length === 0).length],
  ["Kontak", destinasi.filter((d) => !d.kontak).length],
  ["Koordinat", destinasi.filter((d) => d.lat == null).length],
] as const;

export default function MethodologyPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl">Dataset &amp; Metodologi</h1>
        <p className="mt-1 max-w-2xl text-zinc-600">
          Transparansi penuh: apa sumbernya, bagaimana diproses, apa batasannya. Tanggal akses seluruh sumber: <strong>{BUILD_DATE}</strong>.
        </p>
      </div>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Sumber data</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {SOURCES.map((s) => (
            <li key={s.url} className="rounded-lg border border-line p-4 text-sm">
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline underline-offset-2">
                {s.name}
              </a>
              <p className="mt-1 text-zinc-600">{s.coverage}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-zinc-500">
          Data hasil kompilasi manual-terkomputerisasi dari halaman publik resmi. Unduh mentah:{" "}
          <a className="text-accent underline" href="/data/destinasi_kebumen.csv" download>destinasi_kebumen.csv</a> ·{" "}
          <a className="text-accent underline" href="/data/destinasi.json" download>destinasi.json</a>
        </p>
      </section>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Kamus data</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="sr-only">Kamus data kolom dataset</caption>
            <thead>
              <tr className="border-b border-line text-left text-zinc-500">
                <th scope="col" className="py-2 pr-4">Kolom</th>
                <th scope="col" className="py-2 pr-4">Tipe</th>
                <th scope="col" className="py-2">Definisi</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["nama", "string", "Nama destinasi sesuai sumber"],
                ["kategori", "enum", "Wisata Alam & Buatan / Wisata Sejarah / Desa Wisata"],
                ["kecamatan", "enum(26)", "Kecamatan lokasi, dinormalisasi ke daftar resmi"],
                ["deskripsi", "text", "Ringkasan dari sumber (2–6 kalimat)"],
                ["tiket_masuk", "string?", "Rentang harga tiket (Rp), bila dipublikasikan"],
                ["jam_buka", "string?", "Jam operasional, bila dipublikasikan"],
                ["alamat", "string?", "Alamat lengkap, bila tersedia"],
                ["fasilitas", "list", "Daftar fasilitas, bila dipublikasikan"],
                ["kontak / website", "string?", "Kontak pengelola bila dipublikasikan"],
                ["lat, lon", "float?", "Koordinat WGS84 — kosong bila tidak tervalidasi"],
                ["sumber, sumber_url", "list, string", "Jejak sumber tiap record"],
              ].map(([c, t, def]) => (
                <tr key={c as string} className="border-b border-line">
                  <th scope="row" className="py-2 pr-4 font-mono text-xs">{c}</th>
                  <td className="py-2 pr-4 text-zinc-500">{t}</td>
                  <td className="py-2">{def}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Preprocessing</h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-zinc-700">
          <li><strong>Ekstraksi</strong> — scraping halaman publik Disparbud &amp; portal Pemkab (nama, deskripsi, kecamatan, tiket, fasilitas, kontak).</li>
          <li><strong>Deduplikasi</strong> — pencocokan nama ternormalisasi antar sumber; field terbaik dari tiap sumber digabung ({fmtInt(destinasi.length)} record unik).</li>
          <li><strong>Normalisasi kecamatan</strong> — diseragamkan ke 26 kecamatan resmi Kab. Kebumen.</li>
          <li><strong>Geokoding</strong> — OpenStreetMap Overpass + Nominatim (bounded viewbox Kebumen). Record tanpa kecocokan yakin <em>tidak</em> diberi koordinat.</li>
          <li><strong>Validasi</strong> — koordinat wajib jatuh di dalam bbox Kebumen; satu hasil geokode salah kabupaten dikoreksi berdasar referensi sumber.</li>
        </ol>
      </section>

      <section className="rounded-xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl">Keterbatasan &amp; missing values</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold">Kolom kosong (dari {fmtInt(destinasi.length)} record)</h3>
            <ul className="mt-2 text-sm text-zinc-700">
              {MISSING.map(([k, v]) => (
                <li key={k} className="flex justify-between border-b border-line py-1.5">
                  <span>{k}</span>
                  <span className="font-mono">{fmtInt(v)} ({Math.round((v / destinasi.length) * 100)}%)</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
            <li>Jumlah record = kuantitas publikasi sumber, bukan popularitas/kunjungan.</li>
            <li>Cakupan tergantung apa yang dipublikasikan pemerintah saat tanggal akses.</li>
            <li>Perbedaan waktu antar sumber mungkin ada (artikel 2017–2026).</li>
            <li>Tidak ada rating/review — tidak dibuat tanpa metodologi.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
