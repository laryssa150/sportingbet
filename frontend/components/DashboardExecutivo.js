import React, { useEffect, useState } from "react";
 
function DashboardExecutivo() {
  const [relatorios, setRelatorios] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/relatorios")
      .then(res => res.json())
      .then(setRelatorios);
  }, []);
 
  return (
    <section>
      <h2>📊 Dashboard Executivo</h2>
      <ul>
        {relatorios.map(r => (
          <li key={r._id}>{r.metricas} → {r.valor}</li>
        ))}
      </ul>
    </section>
  );
}
 
export default DashboardExecutivo;