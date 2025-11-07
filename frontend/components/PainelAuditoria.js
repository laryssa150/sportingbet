import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function PainelAuditoria() {
  const [logs, setLogs] = useState([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("logSistema", log => {
      setLogs(prev => [log, ...prev]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <section>
      <h2>🧾 Logs de Auditoria</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Ação</th>
            <th>Rota</th>
            <th>IP</th>
            <th>Usuário</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td>{new Date(log.criadoEm).toLocaleString()}</td>
              <td>{log.acao}</td>
              <td>{log.rota}</td>
              <td>{log.ip}</td>
              <td>{log.usuario || "anônimo"}</td>
              <td>{log.detalhes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default PainelAuditoria;
