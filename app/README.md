# Kebumen Tourism Data Explorer 🗺️📊

Dashboard eksplorasi data destinasi wisata **Kabupaten Kebumen, Jawa Tengah** — proyek portofolio sains data yang mendemonstrasikan alur end-to-end: kompilasi data dari sumber resmi, pembersihan & deduplikasi, geokoding tervalidasi, hingga penyajian lewat web dashboard yang jujur terhadap datanya.

> **Prinsip utama:** tidak ada angka, koordinat, foto, atau insight karangan. Record tanpa koordinat tervalidasi *tidak dipetakan* — ditampilkan dengan status "lokasi belum tersedia".

## ✨ Fitur

- **Overview** — KPI terhitung (21 record, 15 kecamatan, 3 kategori, 20/21 koordinat) + grafik komposisi
- **Peta Destinasi** — Leaflet interaktif, filter kecamatan/kategori/pencarian, marker per kategori, daftar hasil sinkron dengan peta
- **Direktori** — pencarian, filter, chips filter aktif, sorting, load-more, empty state
- **Detail Destinasi** — atribut lengkap (tiket, jam buka, fasilitas, kontak), peta mini, sumber record, navigasi antar destinasi sekecamatan
- **Analisis Wilayah** — bar chart per kecamatan, stacked bar kategori, tabel angka persis di balik grafik
- **Dataset & Metodologi** — sumber berklik, kamus data, preprocessing, missing values dihitung & dilaporkan
- Accessibility: heading semantik, label input, tabel alternatif untuk tiap grafik, fokus keyboard terlihat

## 📚 Sumber data

| Sumber | Cakupan |
|---|---|
| [Disparbud Kebumen](https://disparbud.kebumenkab.go.id) — katalog destinasi | 18 destinasi |
| [Portal Pemkab Kebumen](https://www.kebumenkab.go.id/index.php/web/wisata) — potensi daerah | 6 destinasi (tiket, jam buka, fasilitas) |
| [OpenStreetMap](https://www.openstreetmap.org) — Overpass API + Nominatim | Geokode (viewbox Kebumen) |

Tanggal akses: **11 November 2026**. Data mentah: [`public/data/destinasi_kebumen.csv`](public/data/destinasi_kebumen.csv) · [`public/data/destinasi.json`](public/data/destinasi.json).

## 🛠 Teknologi

- Next.js (App Router) + TypeScript
- Tailwind CSS — design system "Modern Civic Data" (ivory `#F6F3ED`, ink `#24231F`, terracotta `#A6533B`)
- Leaflet + react-leaflet — peta
- Chart.js + react-chartjs-2 — visualisasi
- Python (kompilasi data) — ekstraksi, dedup, normalisasi, geokode

## 🚀 Menjalankan

```bash
npm install
npm run dev      # development → http://localhost:3000
npm run build    # production build
npm start        # production → http://localhost:3000
```

## 📁 Struktur

```
app/                    # halaman (App Router): /, /map, /destinations, /analysis, ...
components/             # MapExplorer, DirectoryClient, MiniMap, charts
lib/                    # types.ts, data.ts, slug.ts
public/data/            # dataset (CSV + JSON) + kamus data
data/ (root repo)       # skrip & artefak kompilasi (raw scraping, koordinat)
```

## ⚠️ Keterbatasan

- Jumlah record = **kuantitas publikasi sumber**, bukan popularitas/kunjungan.
- Cakupan tergantung apa yang dipublikasikan pemda saat tanggal akses.
- Atribut kosong (tiket, kontak, dsb.) dibiarkan kosong — tidak diisi tebakan.
- Peta tematik choropleth per kecamatan belum disertakan (geometri batas kecamatan dalam proses validasi).

## 👤 Pembuat

Muhammad Nizar Asagaf — [GitHub: Nizarjoe](https://github.com/Nizarjoe)
