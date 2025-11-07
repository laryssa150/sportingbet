import React, { useEffect, useState } from "react";
 
function PainelCampanhas() {
  const [campanhas, setCampanhas] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/campanhas")
      .then(res => res.json())
      .then(setCampanhas);
  }, []);
 
  return (
    <section>
      <h2>📢 Campanhas</h2>
      <ul>
        {campanhas.map(c => (
          <li key={c._id}>{c.titulo} - {c.tipo} ({c.ativo ? "Ativa" : "Inativa"})</li>
        ))}
      </ul>
    </section>
  );
}
 
export default PainelCampanhas;