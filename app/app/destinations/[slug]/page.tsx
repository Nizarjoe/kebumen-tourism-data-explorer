import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinasi } from "@/lib/data";
import { KATEGORI_COLORS } from "@/lib/types";
import MiniMap from "@/components/MiniMap";
import { slugify } from "@/lib/slug";

const BUILD_DATE = "2026-11-11";

export function generateStaticParams() {
  return destinasi.map((d) => ({ slug: slugify(d.nama) }));
}

async function getDestinasi(slug: string) {
  return destinasi.find((d) => slugify(d.nama) === slug);
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDestinasi(slug);
  if (!d) return { title: "Tidak ditemukan — Kebumen Tourism Data Explorer" };
  return {
    title: `${d.nama} — Kebumen Tourism Data Explorer`,
    description: d.deskripsi.slice(0, 150),
  };
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null || value === "") return null;
  return (
    <div className="grid grid-cols-[140px_1fr] gap-2 border-t border-line py-2 text-sm">
      <dt className="text-zinc-500">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default async function DetailPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const d = await getDestinasi(slug);
  if (!d) notFound();

  const sekecamatan = destinasi.filter((x) => x.kecamatan && x.kecamatan === d.kecamatan && x.nama !== d.nama);
  const hasCoords = d.lat != null && d.lon != null;

  return (
    <article className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-accent">Overview</Link>
        <span aria-hidden> / </span>
        <Link href="/destinations" className="hover:text-accent">Direktori</Link>
        <span aria-hidden> / </span>
        <span className="text-ink">{d.nama}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Kiri: detail */}
        <div className="flex flex-col gap-6">
          <header>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: KATEGORI_COLORS[d.kategori] }} />
              <span className="text-xs font-medium" style={{ color: KATEGORI_COLORS[d.kategori] }}>{d.kategori}</span>
            </div>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl">{d.nama}</h1>
            {d.kecamatan && (
              <p className="mt-1 text-zinc-600">
                Kecamatan {d.kecamatan}, Kabupaten Kebumen, Jawa Tengah
              </p>
            )}
          </header>

          {/* Placeholder visual (aturan: foto hanya bila sumber+izin jelas) */}
          <div className="grid h-48 place-items-center rounded-xl border border-dashed border-line bg-sand/30 text-sm text-zinc-500">
            Foto belum tersedia — menunggu sumber berizin
          </div>

          <section>
            <h2 className="font-display text-xl">Deskripsi</h2>
            <p className="mt-2 leading-relaxed text-zinc-700">{d.deskripsi}</p>
            <p className="mt-2 text-xs text-zinc-500">Sumber deskripsi: {d.sumber.join(", ")} · akses {BUILD_DATE}</p>
          </section>

          <section>
            <h2 className="font-display text-xl">Atribut</h2>
            <dl className="mt-2">
              <Row label="Alamat" value={d.alamat} />
              <Row label="Tiket masuk" value={d.tiket_masuk} />
              <Row label="Jam buka" value={d.jam_buka} />
              <Row
                label="Fasilitas"
                value={d.fasilitas.length ? <ul className="flex flex-wrap gap-1.5">{d.fasilitas.map((f) => (
                  <li key={f} className="rounded-full bg-sand/60 px-2.5 py-0.5 text-xs">{f}</li>
                ))}</ul> : null}
              />
              <Row label="Kontak" value={d.kontak ? <a className="text-accent underline" href={`https://wa.me/${d.kontak}`}>WhatsApp {d.kontak}</a> : null} />
              <Row label="Website" value={d.website ? <a className="text-accent underline break-all" href={d.website} target="_blank" rel="noopener noreferrer">{d.website}</a> : null} />
              <Row label="Koordinat" value={hasCoords ? <span className="font-mono text-xs">{d.lat!.toFixed(5)}, {d.lon!.toFixed(5)} <span className="text-zinc-400">({d.koordinat_sumber})</span></span> : <em className="text-zinc-500">Lokasi belum memiliki koordinat yang dapat dipetakan.</em>} />
            </dl>
          </section>

          <section>
            <h2 className="font-display text-xl">Sumber &amp; kelengkapan</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
              {d.sumber.map((s) => <li key={s}>{s}</li>)}
              <li><a className="text-accent underline" href={d.sumber_url} target="_blank" rel="noopener noreferrer">Halaman sumber</a> · diakses {BUILD_DATE}</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-500">
              Status: {hasCoords ? "koordinat tervalidasi (OpenStreetMap)" : "koordinat belum tervalidasi — tidak dipetakan"}. Info tiket {d.tiket_masuk ? "tersedia" : "belum dipublikasikan sumber"}.
            </p>
          </section>

          {sekecamatan.length > 0 && (
            <section>
              <h2 className="font-display text-xl">Destinasi lain di Kec. {d.kecamatan}</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {sekecamatan.map((x) => (
                  <li key={x.nama}>
                    <Link href={`/destinations/${slugify(x.nama)}`} className="rounded-full border border-line px-3 py-1 text-sm hover:bg-sand/50">
                      {x.nama}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Kanan: sticky peta mini + sumber */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-4">
            <h2 className="font-display text-lg">Lokasi</h2>
            {hasCoords ? (
              <div className="mt-3 h-64">
                <MiniMap lat={d.lat!} lon={d.lon!} nama={d.nama} />
              </div>
            ) : (
              <p className="mt-3 rounded-lg border border-dashed border-line p-4 text-sm text-zinc-500">
                Lokasi belum memiliki koordinat yang dapat dipetakan.
              </p>
            )}
            <a
              href={hasCoords ? `https://www.openstreetmap.org/?mlat=${d.lat}&mlon=${d.lon}#map=15/${d.lat}/${d.lon}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-block text-sm font-medium ${hasCoords ? "text-accent underline underline-offset-2" : "pointer-events-none text-zinc-400"}`}
            >
              Buka di OpenStreetMap →
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
