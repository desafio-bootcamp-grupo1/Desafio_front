import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export default function MonthlyExpensesChart({ data }) {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center" style={{display:"flex",alignItems:"center",gap:8}}>
          <TrendingUp size={18} style={{color:"var(--coral)"}} />
          <span>Análisis de Gastos Mensuales</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="expenses" stroke="#ef7866" fill="#ef7866" fillOpacity={0.8} />
            <Area type="monotone" dataKey="fuel"      stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
            <Area type="monotone" dataKey="maintenance" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
