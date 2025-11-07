import React, { useEffect, useState } from "react";
 
function PrevisaoComportamento() {
  const [previsoes, setPrevisoes] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/ia")
      .then(res => res.json())
      .then(setPrevisoes);
  }, []);
 
  return (
    <section>
      <h2>🔮 Previsões de Comportamento</h2>
      <ul>
        {previsoes.map(p => (
          <li key={p._id}>{p.usuario} → {p.probabilidade}% de {p.acao}</li>
        ))}
      </ul>
    </section>
  );
}
 