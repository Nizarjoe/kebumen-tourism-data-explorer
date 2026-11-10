/**
 * Kompilasi data — ringkasan pipeline (dijalankan via Python di luar app)
 *
 * Pipeline (data/ folder di root repo):
 * 1. raw_disparbud.json  — scrape katalog Disparbud Kebumen (18 destinasi)
 * 2. raw_portal.json     — scrape Portal Pemkab Kebumen (detail tiket/fasilitas)
 * 3. parsed_*.json       — ekstraksi field (nama, kecamatan, deskripsi, tiket, fasilitas, kontak)
 * 4. coords.json         — geokode Nominatim (viewbox Kebumen, bounded)
 * 5. osm_raw.json        — POI OpenStreetMap via Overpass API (attractions/beaches/waterfalls)
 * 6. destinasi_master.json — merge + dedup + normalisasi kecamatan + validasi koordinat
 * 7. destinasi_kebumen.csv — dataset final (21 record) → disalin ke app/public/data/
 *
 * Prinsip: koordinat hanya diisi bila geokode yakin jatuh di bbox Kebumen;
 * record tanpa kecocokan yakin TIDAK diberi koordinat (Sagara View Of Karangbolong).
 */
export {};
