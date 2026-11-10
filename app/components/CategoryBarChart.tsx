"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CategoryBarChart({
  data,
  colors,
}: {
  data: Record<string, number>;
  colors: Record<string, string>;
}) {
  const labels = Object.keys(data);
  return (
    <div className="mt-4" role="img" aria-label={`Bar chart komposisi kategori: ${labels.map((l) => `${l} ${data[l]}`).join(", ")}`}>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Jumlah record",
              data: Object.values(data),
              backgroundColor: labels.map((l) => colors[l] ?? "#687263"),
              borderRadius: 6,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
        }}
      />
      <table className="mt-3 w-full text-xs text-zinc-600">
        <caption className="sr-only">Tabel alternatif komposisi kategori</caption>
        <tbody>
          {labels.map((l) => (
            <tr key={l} className="border-t border-line">
              <th scope="row" className="py-1 text-left font-medium">{l}</th>
              <td className="py-1 text-right">{data[l]} record</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
