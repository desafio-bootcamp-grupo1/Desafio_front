import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Droplet } from "lucide-react";

export function FuelChart({ data }) {
  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplet size={18} style={{ color: "var(--coral)" }} />
          Consumo en combustible (L)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="chart-content" style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="liters"
                stroke="#ef7866"
                fill="#ef7866"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
