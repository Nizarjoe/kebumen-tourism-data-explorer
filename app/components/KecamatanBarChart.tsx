"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function KecamatanBarChart({ data }: { data: Record<string, number> }) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return (
    <div className="mt-4" role="img" aria-label="Bar chart jumlah record per kecamatan">
      <Bar
        data={{
          labels: sorted.map(([k]) => k),
          datasets: [
            {
              label: "Jumlah record",
              data: sorted.map(([, v]) => v),
              backgroundColor: "#687263",
              borderRadius: 6,
            },
          ],
        }}
        options={{
          indexAxis: "y" as const,
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { x: { beginAtZero: true, ticks: { precision: 0 } } },
        }}
      />
      <table className="mt-3 w-full text-xs text-zinc-600">
        <caption className="sr-only">Tabel alternatif record per kecamatan</caption>
        <tbody>
          {sorted.map(([k, v]) => (
            <tr key={k} className="border-t border-line">
              <th scope="row" className="py-1 text-left font-medium">{k}</th>
              <td className="py-1 text-right">{v} record</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
