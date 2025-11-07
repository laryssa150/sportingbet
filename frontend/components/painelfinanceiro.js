import React, { useEffect, useState } from "react";
 
function PainelFinanceiro() {
  const [pagamentos, setPagamentos] = useState([]);
  const [saques, setSaques] = useState([]);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
 
    fetch("http://localhost:3000/api/pagamentos", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setPagamentos);
 
    fetch("http://localhost:3000/api/saques", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setSaques);
  }, []);
 
  return (
    <section>
      <h2>💳 Pagamentos Pix</h2>
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Pix ID</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map(p => (
            <tr key={p._id}>
              <td>R$ {p.valor.toFixed(2)}</td>
              <td>{p.descricao}</td>
              <td>{p.status}</td>
              <td>{p.pixId}</td>
            </tr>
          ))}
        </tbody>
      </table>
 
      <h2>💸 Saques Solicitados</h2>
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>Chave Pix</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {saques.map(s => (
            <tr key={s._id}>
              <td>R$ {s.valor.toFixed(2)}</td>
              <td>{s.chavePix}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
 
export default PainelFinanceiro;
 