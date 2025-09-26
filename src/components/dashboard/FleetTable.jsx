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
              <th>Combustible</th>
              <th>Velocidad</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.driver}</td>
                <td>{r.vehicle}</td>
                <td>
                  <span className={`badge badge--${r.status === "En ruta" ? "green" : r.status === "Parado" ? "yellow" : "gray"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="fleet-table__location">{r.location}</td>
                <td>
                  <div className="progress">
                    <div className={`progress__bar progress__bar--${r.fuel > 50 ? "green" : r.fuel > 25 ? "yellow" : "red"}`} style={{ width: `${r.fuel}%` }} />
                  </div>
                  <span className="progress__value">{r.fuel}%</span>
                </td>
                <td className={`speed ${r.speed > 0 ? "speed--active" : ""}`}>{r.speed} km/h</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
