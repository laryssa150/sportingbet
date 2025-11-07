import React, { useEffect, useState } from "react";
 
function ApostasPainel() {
  const [apostas, setApostas] = useState([]);
  const [novaAposta, setNovaAposta] = useState({
    esporte: "",
    mercado: "",
    odd: "",
    valor: ""
  });
 
  useEffect(() => {
    fetch("http://localhost:3000/api/apostas")
      .then(res => res.json())
      .then(data => setApostas(data));
  }, []);
 
  const enviarAposta = async () => {
    await fetch("http://localhost:3000/api/apostas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaAposta)
    });
    setNovaAposta({ esporte: "", mercado: "", odd: "", valor: "" });
    const atualizadas = await fetch("http://localhost:3000/api/apostas").then(res => res.json());
    setApostas(atualizadas);
  };
 
  return (
    <section>
      <h2>📊 Apostas</h2>
      <input placeholder="Esporte" value={novaAposta.esporte} onChange={e => setNovaAposta({ ...novaAposta, esporte: e.target.value })} />
      <input placeholder="Mercado" value={novaAposta.mercado} onChange={e => setNovaAposta({ ...novaAposta, mercado: e.target.value })} />
      <input placeholder="Odd" value={novaAposta.odd} onChange={e => setNovaAposta({ ...novaAposta, odd: e.target.value })} />
      <input placeholder="Valor" value={novaAposta.valor} onChange={e => setNovaAposta({ ...novaAposta, valor: e.target.value })} />
      <button onClick={enviarAposta}>Salvar Aposta</button>
 
      <ul>
        {apostas.map(aposta => (
          <li key={aposta._id}>
            {aposta.esporte} - {aposta.mercado} - R${aposta.valor} @ {aposta.odd}
          </li>
        ))}
      </ul>
    </section>
  );
}
 
export default ApostasPainel;