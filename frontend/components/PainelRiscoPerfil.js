import React, { useEffect, useState } from "react";
 
function PainelRiscoPerfil() {
  const [riscos, setRiscos] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/riscos")
      .then(res => res.json())
      .then(setRiscos);
  }, []);
 
  return (
    <section>
      <h2>🚨 Risco por Perfil</h2>
      <ul>
        {riscos.map(r => (
          <li key={r._id}>{r.usuario} → Risco: {r.nivel}</li>
        ))}
      </ul>
    </section>
  );
}
 
export default PainelRiscoPerfil;