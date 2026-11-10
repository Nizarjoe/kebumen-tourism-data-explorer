export type Kategori = "Wisata Alam & Buatan" | "Wisata Sejarah" | "Desa Wisata";

export interface Destinasi {
  nama: string;
  kategori: Kategori;
  kecamatan: string | null;
  deskripsi: string;
  tiket_masuk: string | null;
  jam_buka: string | null;
  alamat: string | null;
  fasilitas: string[];
  kontak: string | null;
  website: string | null;
  sumber: string[];
  sumber_url: string;
  lat?: number;
  lon?: number;
  koordinat_sumber?: string;
}

export const KATEGORI_LIST: Kategori[] = [
  "Wisata Alam & Buatan",
  "Wisata Sejarah",
  "Desa Wisata",
];

export const KATEGORI_COLORS: Record<Kategori, string> = {
  "Wisata Alam & Buatan": "#2f7d5c",
  "Wisata Sejarah": "#a6533b",
  "Desa Wisata": "#3b6ea6",
};
