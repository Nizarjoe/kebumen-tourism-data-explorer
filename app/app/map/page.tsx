import type { Metadata } from "next";
import MapExplorer from "@/components/MapExplorer";

export const metadata: Metadata = {
  title: "Peta Destinasi — Kebumen Tourism Data Explorer",
  description: "Peta interaktif destinasi wisata Kabupaten Kebumen dengan filter kecamatan dan kategori.",
};

export default function MapPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-display text-3xl">Peta Destinasi</h1>
        <p className="mt-1 text-zinc-600">
          Filter kecamatan/kategori — peta dan daftar hasil selalu sinkron. Record tanpa koordinat tervalidasi tidak dipetakan.
        </p>
      </div>
      <MapExplorer />
    </div>
  );
}
