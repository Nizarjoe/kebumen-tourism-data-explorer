"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinasi } from "@/lib/data";
import { KATEGORI_LIST, KATEGORI_COLORS } from "@/lib/types";
import { slugify } from "@/lib/slug";

const PAGE_SIZE = 9;

type SortKey = "nama-asc" | "nama-desc" | "kecamatan";

export default function DirectoryClient() {
  const [q, setQ] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kategori, setKategori] = useState("");
  const [sort, setSort] = useState<SortKey>("nama-asc");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const kecamatanList = useMemo(
    () => [...new Set(destinasi.map((d) => d.kecamatan).filter((k): k is string => !!k))].sort(),
    []
  );

  const filtered = useMemo(() => {
    let out = destinasi.filter((d) => {
      if (kecamatan && d.kecamatan !== kecamatan) return false;
      if (kategori && d.kategori !== kategori) return false;
      if (q && !(d.nama.toLowerCase().includes(q.toLowerCase()) || d.deskripsi.toLowerCase().includes(q.toLowerCase())))
        return false;
      return true;
    });
    out = [...out].sort((a, b) => {
      switch (sort) {
        case "nama-desc":
          return b.nama.localeCompare(a.nama, "id");
        case "kecamatan":
          return (a.kecamatan ?? "zz").localeCompare(b.kecamatan ?? "zz", "id") || a.nama.localeCompare(b.nama, "id");
        default:
          return a.nama.localeCompare(b.nama, "id");
      }
    });
    return out;
  }, [q, kecamatan, kategori, sort]);

  const chips: { label: string; clear: () => void }[] = [];
  if (q) chips.push({ label: `Pencarian: "${q}"`, clear: () => setQ("") });
  if (kecamatan) chips.push({ label: `Kecamatan: ${kecamatan}`, clear: () => setKecamatan("") });
  if (kategori) chips.push({ label: `Kategori: ${kategori}`, clear: () => setKategori("") });

  const shown = filtered.slice(0, visible);

  return (
    <div className="flex flex-col gap-4">
      {/* Search + filter */}
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <label htmlFor="dir-q" className="text-sm font-medium">Pencarian</label>
            <input
              id="dir-q"
              value={q}
              onChange={(e) => { setQ(e.target.value); setVisible(PAGE_SIZE); }}
              placeholder="Cari nama destinasi..."
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
            />
          </div>
          <div>
            <label htmlFor="dir-kec" className="text-sm font-medium">Kecamatan</label>
            <select
              id="dir-kec"
              value={kecamatan}
              onChange={(e) => { setKecamatan(e.target.value); setVisible(PAGE_SIZE); }}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="">Semua</option>
              {kecamatanList.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="dir-kat" className="text-sm font-medium">Kategori</label>
            <select
              id="dir-kat"
              value={kategori}
              onChange={(e) => { setKategori(e.target.value); setVisible(PAGE_SIZE); }}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm"
            >
              <option value="">Semua</option>
              {KATEGORI_LIST.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        {/* Chips + sort + reset */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {chips.map((c) => (
            <button
              key={c.label}
              onClick={c.clear}
              className="flex items-center gap-1 rounded-full bg-sand/70 px-3 py-1 text-xs hover:bg-sand"
              aria-label={`Hapus filter ${c.label}`}
            >
              {c.label} <span aria-hidden>×</span>
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <label htmlFor="dir-sort" className="text-sm text-zinc-600">Urutkan</label>
            <select
              id="dir-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-line bg-surface px-2 py-1 text-sm"
            >
              <option value="nama-asc">Nama A–Z</option>
              <option value="nama-desc">Nama Z–A</option>
              <option value="kecamatan">Kecamatan</option>
            </select>
            {chips.length > 0 && (
              <button
                onClick={() => { setQ(""); setKecamatan(""); setKategori(""); setVisible(PAGE_SIZE); }}
                className="rounded-lg border border-line px-3 py-1 text-sm hover:bg-sand/50"
              >
                Reset semua
              </button>
            )}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="text-sm text-zinc-600">
        Menampilkan <strong className="text-ink">{shown.length}</strong> dari {filtered.length} destinasi
        berdasarkan filter saat ini.
      </p>

      {/* Kartu */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-line bg-surface p-10 text-center">
          <p className="text-zinc-600">Tidak ada destinasi yang cocok. Coba ubah filter atau kata kunci.</p>
          <button
            onClick={() => { setQ(""); setKecamatan(""); setKategori(""); }}
            className="mt-3 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => (
            <li key={d.nama}>
              <Link
                href={`/destinations/${slugify(d.nama)}`}
                className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: KATEGORI_COLORS[d.kategori] }} />
                  <span className="text-xs font-medium" style={{ color: KATEGORI_COLORS[d.kategori] }}>{d.kategori}</span>
                </div>
                <h2 className="mt-2 font-display text-xl leading-snug">{d.nama}</h2>
                {d.kecamatan && <p className="text-sm text-zinc-500">Kec. {d.kecamatan}</p>}
                <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{d.deskripsi}</p>
                <div className="mt-auto pt-3 text-xs text-zinc-500">
                  {d.tiket_masuk ? `Tiket: ${d.tiket_masuk}` : "Info tiket tidak dipublikasikan"}
                  {d.lat == null && <span className="ml-2 rounded bg-sand/60 px-1.5 py-0.5">koordinat belum tersedia</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {visible < filtered.length && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="self-center rounded-lg border border-line bg-surface px-6 py-2.5 text-sm font-medium hover:bg-sand/50"
        >
          Muat lebih banyak ({filtered.length - visible} tersisa)
        </button>
      )}
    </div>
  );
}
