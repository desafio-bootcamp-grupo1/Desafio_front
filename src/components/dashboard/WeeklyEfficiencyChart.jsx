import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

export default function WeeklyEfficiencyChart({ data }) {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center" style={{display:"flex",alignItems:"center",gap:8}}>
          <BarChart3 size={18} style={{color:"var(--coral)"}} />
          <span>Eficiencia Semanal por Día</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="efficiency" fill="#ef7866" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
