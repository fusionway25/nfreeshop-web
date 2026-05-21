"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const DATA = [
  { date: "5/1", downloads: 280, redeems: 88, users: 210 },
  { date: "5/5", downloads: 320, redeems: 105, users: 245 },
  { date: "5/8", downloads: 410, redeems: 132, users: 298 },
  { date: "5/10", downloads: 380, redeems: 120, users: 310 },
  { date: "5/13", downloads: 520, redeems: 168, users: 389 },
  { date: "5/15", downloads: 490, redeems: 155, users: 410 },
  { date: "5/18", downloads: 610, redeems: 198, users: 480 },
  { date: "5/21", downloads: 720, redeems: 230, users: 542 },
];

export default function AdminChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e5e7eb" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="users" name="방문자" stroke="#8b5cf6" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="downloads" name="다운로드" stroke="#0B1A30" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="redeems" name="리딤" stroke="#D4AF37" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
