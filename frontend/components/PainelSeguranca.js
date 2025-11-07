import React, { useEffect, useState } from "react";
 
function PainelSeguranca() {
  const [eventos, setEventos] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/seguranca")
      .then(res => res.json())
      .then(setEventos);
  }, []);
 
  return (
    <section>
      <h2>🔐 Segurança</h2>
      <ul>
        {eventos.map(e => (
          <li key={e._id}>{e.tipo} - {e.criticidade} ({e.origemIP})</li>
        ))}
      </ul>
    </section>
  );
}
 
export default PainelSeguranca;