import React, { useEffect, useState } from "react";
 
function GraficoEngajamento() {
  const [dados, setDados] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/engajamento")
      .then(res => res.json())
      .then(setDados);
  }, []);
 
  return (
    <section>
      <h2>📈 Engajamento</h2>
      <ul>
        {dados.map(d => (
          <li key={d._id}>{d.usuario} → {d.interacoes} interações</li>
        ))}
      </ul>
    </section>
  );
}
 
export default GraficoEngajament