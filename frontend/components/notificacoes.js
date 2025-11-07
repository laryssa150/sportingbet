import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Notificacoes() {
  const [mensagens, setMensagens] = useState([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("usuarioRegistrado", dados => {
      setMensagens(msgs => [
        ...msgs,
        `🆕 Novo usuário registrado: ${dados.nome} (${dados.email})`
      ]);
    });

    socket.on("usuarioLogado", dados => {
      setMensagens(msgs => [
        ...msgs,
        `✅ Login realizado: ${dados.nome} (${dados.email})`
      ]);
    });

    socket.on("previsaoGerada", dados => {
  setMensagens(msgs => [
    ...msgs,
    `📈 Previsão gerada: ${dados.resultado.toFixed(2)} com base em ${dados.historico.length} dias`
  ]);
});


    return () => socket.disconnect();
  },[]);

  return (
    <aside>
      <h3>🔔 Notificações</h3>
      <ul>
        {mensagens.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </aside>
  );
}

export default Notificacoes;
