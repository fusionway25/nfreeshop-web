"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DATA = [
  { day: "5/15", downloads: 145, redeems: 42 },
  { day: "5/16", downloads: 189, redeems: 58 },
  { day: "5/17", downloads: 210, redeems: 63 },
  { day: "5/18", downloads: 178, redeems: 54 },
  { day: "5/19", downloads: 234, redeems: 71 },
  { day: "5/20", downloads: 198, redeems: 60 },
  { day: "5/21", downloads: 312, redeems: 98 },
];

export default function MerchantChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip
          contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="downloads" name="다운로드" fill="#0B1A30" radius={[4, 4, 0, 0]} />
        <Bar dataKey="redeems" name="사용(리딤)" fill="#D4AF37" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
