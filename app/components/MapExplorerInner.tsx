"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { destinasi } from "@/lib/data";
import { KATEGORI_LIST, KATEGORI_COLORS, type Kategori } from "@/lib/types";
import { slugify } from "@/lib/slug";

const ICONS: Record<Kategori, L.DivIcon> = Object.fromEntries(
  KATEGORI_LIST.map((k) => [
    k,
    L.divIcon({
      className: "",
      html: `<span style="display:block;width:16px;height:16px;border-radius:50%;background:${KATEGORI_COLORS[k]};border:2.5px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    }),
  ])
) as Record<Kategori, L.DivIcon>;

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useMemo(() => {
    if (points.length > 1) {
      map.fitBounds(points, { padding: [24, 24] });
    } else if (points.length === 1) {
      map.setView(points[0], 12);
    }
  }, [points, map]);
  return null;
}

export default function MapExplorerInner() {
  const [q, setQ] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kategori, setKategori] = useState("");

  const kecamatanList = useMemo(
    () => [...new Set(destinasi.map((d) => d.kecamatan).filter((k): k is string => !!k))].sort(),
    []
  );

  const filtered = useMemo(
    () =>
      destinasi.filter((d) => {
        if (kecamatan && d.kecamatan !== kecamatan) return false;
        if (kategori && d.kategori !== kategori) return false;
        if (q && !d.nama.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [q, kecamatan, kategori]
  );

  const mapped = filtered.filter((d) => d.lat != null && d.lon != null);
  const unmapped = filtered.filter((d) => d.lat == null || d.lon == null);
  const points = mapped.map((d) => [d.lat!, d.lon!] as [number, number]);
  const hasFilter = !!(q || kecamatan || kategori);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* Panel filter + hasil */}
      <aside className="order-2 flex w-full flex-col gap-3 lg:order-1 lg:w-[35%]">
        <div className="rounded-xl border border-line bg-surface p-4">
          <h2 className="font-display text-lg">Filter</h2>
          <div className="mt-3 flex flex-col gap-3">
            <div>
              <label htmlFor="map-q" className="text-sm font-medium">Cari nama</label>
              <input
                id="map-q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari nama destinasi..."
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>
            <div>
              <label htmlFor="map-kec" className="text-sm font-medium">Kecamatan</label>
              <select
                id="map-kec"
                value={kecamatan}
                onChange={(e) => setKecamatan(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
              >
                <option value="">Semua kecamatan</option>
                {kecamatanList.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="map-kat" className="text-sm font-medium">Kategori</label>
              <select
                id="map-kat"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-accent"
              >
                <option value="">Semua kategori</option>
                {KATEGORI_LIST.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
            {hasFilter && (
              <button
                onClick={() => { setQ(""); setKecamatan(""); setKategori(""); }}
                className="self-start rounded-lg border border-line px-3 py-1.5 text-sm hover:bg-sand/50"
              >
                Reset semua filter
              </button>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-sm text-zinc-600">
            Menampilkan <strong className="text-ink">{mapped.length}</strong> destinasi di peta
            {unmapped.length > 0 && <> · {unmapped.length} tanpa koordinat</>}
          </p>
          <ul className="mt-3 flex max-h-[420px] flex-col gap-2 overflow-y-auto">
            {mapped.map((d) => (
              <li key={d.nama}>
                <Link
                  href={`/destinations/${slugify(d.nama)}`}
                  className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm transition-colors hover:bg-sand/40"
                >
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: KATEGORI_COLORS[d.kategori] }} />
                  <span className="flex-1">{d.nama}</span>
                  <span className="text-xs text-zinc-500">{d.kecamatan}</span>
                </Link>
              </li>
            ))}
            {unmapped.map((d) => (
              <li key={d.nama} className="rounded-lg border border-dashed border-line px-3 py-2 text-sm text-zinc-500">
                {d.nama} — <em>lokasi belum memiliki koordinat yang dapat dipetakan</em>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-2 py-6 text-center text-sm text-zinc-500">
                Tidak ada destinasi yang cocok. Coba ubah filter atau kata kunci.
              </li>
            )}
          </ul>
        </div>

        {/* Legenda */}
        <div className="rounded-xl border border-line bg-surface p-4 text-sm">
          <h2 className="font-display text-lg">Legenda</h2>
          <ul className="mt-2 flex flex-col gap-1.5">
            {KATEGORI_LIST.map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-white shadow" style={{ background: KATEGORI_COLORS[k] }} />
                {k}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Peta */}
      <div className="order-1 flex-1 lg:order-2">
        <div className="h-[480px] lg:h-[680px]">
          <MapContainer
            center={[-7.72, 109.65]}
            zoom={10}
            scrollWheelZoom
            className="h-full w-full"
            aria-label="Peta destinasi wisata Kebumen"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds points={points} />
            {mapped.map((d) => (
              <Marker key={d.nama} position={[d.lat!, d.lon!]} icon={ICONS[d.kategori]}>
                <Popup>
                  <strong>{d.nama}</strong>
                  <br />
                  {d.kategori} · {d.kecamatan}
                  <br />
                  <Link href={`/destinations/${slugify(d.nama)}`} className="text-accent underline">
                    Lihat detail →
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
