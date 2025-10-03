import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign } from "lucide-react";

export function SavingsChart({ data }) {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign size={18} style={{ color: "var(--coral)" }} />
          Ahorro / Gasto (€)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-content" style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spend" fill="#ef7866" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}