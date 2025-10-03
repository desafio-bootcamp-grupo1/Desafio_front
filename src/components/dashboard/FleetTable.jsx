import React from "react";
import "../../styles/components/_dashboard-table.scss";

export default function FleetTable({ rows }) {
  return (
    <div className="fleet-table card">
      <div className="fleet-table__header">
        <h3 className="fleet-table__title">Estado de la Flota</h3>
        <input className="fleet-table__search" placeholder="Buscar conductor..." />
      </div>

      <div className="fleet-table__body">
        <table>
          <thead>
            <tr>
              <th>Conductor</th>
              <th>Vehículo</th>
              <th>Estado</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.driver}</td>
                <td>{r.vehicle}</td>
                <td>
                  <span className={`badge badge--${r.status === "Activo" ? "green" : r.status === "Parado" ? "yellow" : "gray"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="fleet-table__location">Bilbao, España</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
