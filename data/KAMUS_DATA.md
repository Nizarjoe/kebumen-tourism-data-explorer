# Kamus Data — Kebumen Tourism Data Explorer

## Tabel: destinasi_kebumen.csv (21 record)

| Kolom | Tipe | Deskripsi |
|---|---|---|
| id | int | ID unik record |
| nama | string | Nama destinasi (resmi sesuai sumber) |
| kategori | enum | Wisata Alam & Buatan / Wisata Sejarah / Desa Wisata |
| kecamatan | enum(26) | Kecamatan lokasi (dinormalisasi ke daftar 26 kecamatan resmi) |
| deskripsi | text | Ringkasan (dari sumber, ring 2-6 kalimat) |
| tiket_masuk | string | Rentang harga tiket (Rupiah), kosong bila tidak dipublikasikan |
| jam_buka | string | Jam operasional bila dipublikasikan |
| alamat | string | Alamat lengkap bila tersedia |
| fasilitas | list[string] | Daftar fasilitas (dipisah ";") |
| kontak | string | Nomor WhatsApp pengelola bila dipublikasikan |
| website | string | Link resmi (umumnya Instagram pengelola) |
| lat / lon | float | Koordinat WGS84 — KOSONG bila tidak tervalidasi (tidak dipetakan) |
| koordinat_sumber | string | Sumber geokode |
| sumber | list[string] | Daftar sumber resmi |
| sumber_url | string | URL halaman sumber |

## Metodologi kompilasi
1. **Ekstraksi**: scraping halaman publik Disparbud Kebumen (18 destinasi) + Portal Wisata Pemkab Kebumen (6 destinasi dengan detail tiket/fasilitas).
2. **Dedup**: pencocokan nama ternormalisasi antar sumber → record gabungan (21 unik), field terbaik dari tiap sumber.
3. **Normalisasi**: nama kecamatan diseragamkan ke daftar 26 kecamatan resmi Kab. Kebumen.
4. **Geokoding**: OpenStreetMap (Overpass API + Nominatim, bounded viewbox Kebumen). Record tanpa kecocokan yakin **TIDAK diberi koordinat** dan tidak ditampilkan di peta (20/21 tergeokode).
5. **Validasi**: koordinat wajib jatuh dalam bbox Kebumen; desa Wonosari hasil geokode Purworejo dikoreksi ke Sadang berdasar referensi sumber.

## Batasan
- Jumlah record = kuantitas publikasi, BUKAN ukuran popularitas.
- Tiket masuk berupa rentang (weekday/weekend) sesuai sumber.
- Data dikompilasi [tanggal build]; dapat berubah — selalu cek sumber resmi.
