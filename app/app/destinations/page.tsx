import type { Metadata } from "next";
import DirectoryClient from "@/components/DirectoryClient";

export const metadata: Metadata = {
  title: "Direktori Destinasi — Kebumen Tourism Data Explorer",
  description: "Cari, filter, dan urutkan destinasi wisata Kabupaten Kebumen.",
};

export default function DestinationsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-display text-3xl">Direktori Destinasi</h1>
        <p className="mt-1 text-zinc-600">Seluruh record destinasi wisata Kebumen pada dataset.</p>
      </div>
      <DirectoryClient />
    </div>
  );
}
