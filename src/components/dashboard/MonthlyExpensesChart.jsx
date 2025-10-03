import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

export default function MonthlyExpensesChart({ data, total }) {
  const chartData = [
    { month: "Ene", expenses: 14200, fuel: 1200, maintenance: 800 },
    { month: "Feb", expenses: 13800, fuel: 1150, maintenance: 650 },
    { month: "Mar", expenses: 14500, fuel: 1300, maintenance: 900 },
    { month: "Abr", expenses: 13900, fuel: 1180, maintenance: 720 },
    { month: "May", expenses: 14000, fuel: 1220, maintenance: 780 },
    { month: "Jun", expenses: 13650, fuel: 1100, maintenance: 550 },
  ];

  return (
    <Card className="card">
      <CardHeader>
        <CardTitle className="flex items-center" style={{display:"flex",alignItems:"center",gap:8}}>
          <TrendingUp size={18} style={{color:"var(--coral)"}} />
          <span>
            Análisis de Gastos Mensuales 
            {total > 0 && (
              <span style={{ fontSize: '0.9em', marginLeft: '8px', color: 'var(--coral)', fontWeight: 'normal' }}>
                - Total Actual: €{total.toFixed(2)}
              </span>
            )}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`€${value.toFixed(2)}`, '']}
              labelFormatter={(label) => `Mes: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef7866" 
              fill="#ef7866" 
              fillOpacity={0.8} 
              name="Gastos Totales"
            />
            <Area 
              type="monotone" 
              dataKey="fuel" 
              stroke="#22c55e" 
              fill="#22c55e" 
              fillOpacity={0.6} 
              name="Combustible"
            />
            <Area 
              type="monotone" 
              dataKey="maintenance" 
              stroke="#f59e0b" 
              fill="#f59e0b" 
              fillOpacity={0.4} 
              name="Mantenimiento"
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {total > 0 && (
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            textAlign: 'center'
          }}>
            <strong style={{ color: 'var(--coral)' }}>
              Gasto del Mes Actual: €{total.toFixed(2)}
            </strong>
          </div>
        )}
      </CardContent>
    </Card>
  );
}