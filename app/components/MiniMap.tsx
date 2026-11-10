"use client";

import dynamic from "next/dynamic";

const LeafletMini = dynamic(() => import("./MiniMapInner"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center rounded-xl border border-dashed border-line bg-sand/30 text-sm text-zinc-500">
      Peta dimuat...
    </div>
  ),
});

export default function MiniMap({ lat, lon, nama }: { lat: number; lon: number; nama: string }) {
  return <LeafletMini lat={lat} lon={lon} nama={nama} />;
}
