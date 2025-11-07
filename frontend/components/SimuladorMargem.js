import React, { useEffect, useState } from "react";
 
function SimuladorMargem() {
  const [margens, setMargens] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/margem")
      .then(res => res.json())
      .then(setMargens);
  }, []);
 
  return (
    <section>
      <h2>💰 Simulador de Margem</h2>
      <ul>
        {margens.map(m => (
          <li key={m._id}>{m.aposta} → Margem: {m.margem}%</li>
        ))}
      </ul>
    </section>
  );
}
 
export default SimuladorMargem;