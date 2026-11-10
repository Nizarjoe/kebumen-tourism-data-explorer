"use client";

import dynamic from "next/dynamic";

const Explorer = dynamic(() => import("./MapExplorerInner"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[480px] place-items-center rounded-xl border border-dashed border-line bg-sand/30 text-sm text-zinc-500 lg:h-[680px]">
      Peta dimuat...
    </div>
  ),
});

export default function MapExplorer() {
  return <Explorer />;
}
