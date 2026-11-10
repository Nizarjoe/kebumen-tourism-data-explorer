import type { Metadata } from "next";
import { Geist, DM_Serif_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const dmSerif = DM_Serif_Display({ variable: "--font-dm_serif_display", weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kebumen Tourism Data Explorer",
  description:
    "Dashboard eksplorasi data destinasi wisata Kabupaten Kebumen — peta interaktif, direktori, dan analisis wilayah berbasis data sumber resmi.",
};

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/map", label: "Peta" },
  { href: "/destinations", label: "Direktori" },
  { href: "/analysis", label: "Analisis Wilayah" },
  { href: "/data-methodology", label: "Dataset & Metodologi" },
  { href: "/about", label: "Tentang" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${geistSans.variable} ${dmSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans">
        <header className="border-b border-line bg-surface">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm font-bold text-white">KT</span>
              <span className="font-display text-lg leading-none">Kebumen Tourism Data Explorer</span>
            </Link>
            <nav aria-label="Navigasi utama" className="ml-auto flex flex-wrap gap-1 text-sm">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-lg px-3 py-1.5 text-zinc-600 transition-colors hover:bg-sand/60 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6">{children}</main>
        <footer className="border-t border-line bg-surface text-sm text-zinc-600">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-6 sm:px-6">
            <p>
              Data dikompilasi dari sumber resmi:{" "}
              <a className="text-accent underline underline-offset-2" href="https://disparbud.kebumenkab.go.id" target="_blank" rel="noopener noreferrer">Disparbud Kebumen</a>{" "}
              &amp;{" "}
              <a className="text-accent underline underline-offset-2" href="https://www.kebumenkab.go.id" target="_blank" rel="noopener noreferrer">Portal Pemkab Kebumen</a>{" "}
              · Geokode: OpenStreetMap.
            </p>
            <p>Jumlah record = kuantitas publikasi, bukan ukuran popularitas. Proyek portofolio sains data.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
