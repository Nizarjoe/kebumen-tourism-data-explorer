"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const COLORS: Record<string, string> = {
  "Wisata Alam & Buatan": "#2f7d5c",
  "Wisata Sejarah": "#a6533b",
  "Desa Wisata": "#3b6ea6",
};

export default function StackedKecamatanChart({
  data,
  katList,
}: {
  data: Record<string, Record<string, number>>;
  katList: string[];
}) {
  const kec = Object.keys(data);
  return (
    <div className="mt-4" role="img" aria-label="Stacked bar komposisi kategori per kecamatan">
      <Bar
        data={{
          labels: kec,
          datasets: katList.map((kat) => ({
            label: kat,
            data: kec.map((k) => data[k][kat] ?? 0),
            backgroundColor: COLORS[kat] ?? "#687263",
            borderRadius: 4,
          })),
        }}
        options={{
          responsive: true,
          scales: {
            x: { stacked: true },
            y: { stacked: true, beginAtZero: true, ticks: { precision: 0 } },
          },
        }}
      />
      <table className="sr-only">
        <caption>Tabel alternatif komposisi kategori per kecamatan</caption>
        <tbody>
          {kec.map((k) => (
            <tr key={k}>
              <th>{k}</th>
              {katList.map((kat) => <td key={kat}>{data[k][kat] ?? 0}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
