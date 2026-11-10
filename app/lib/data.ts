import raw from "@/public/data/destinasi.json";
import type { Destinasi } from "./types";

export const destinasi = raw as Destinasi[];

export function countBy<T>(items: T[], key: (t: T) => string | null): Record<string, number> {
  const out: Record<string, number> = {};
  for (const it of items) {
    const k = key(it) ?? "Tidak diketahui";
    out[k] = (out[k] ?? 0) + 1;
  }
  return out;
}

export function normalizeKecamatan(raw: string): string {
  const trimmed = raw.trim().toLowerCase();
  const map: Record<string, string> = {
    "kebumen": "Kebumen",
    "ayah": "Ayah",
    "buayan": "Buayan",
    "gombong": "Gombong",
    "sempor": "Sempor",
    "rowokele": "Rowokele",
    "padureso": "Padureso",
    "karanganyar": "Karanganyar",
    "kejar": "Kejar",
    "poncowarno": "Poncowarno",
    "alian": "Alian",
    "sadang": "Sadang",
    "karanggayam": "Karanggayam",
    "karangsambung": "Karangsambung",
    "adimulyo": "Adimulyo",
    "pejagoan": "Pejagoan",
    "puring": "Puring",
    "petanahan": "Petanahan",
    "klirong": "Klirong",
    "buluspesantren": "Buluspesantren",
    "kuwarasan": "Kuwarasan",
    "petalongan": "Petalongan",
    "prembun": "Prembun",
    "kutowinangun": "Kutowinangun",
    "arum": "Arum",
    "sruweng": "Sruweng",
  };
  return map[trimmed] ?? raw.trim();
}

export const fmtInt = (n: number) => new Intl.NumberFormat("id-ID").format(n);
