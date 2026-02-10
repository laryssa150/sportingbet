const fs = require("fs");
const path = require("path");

const logPath = path.join(__dirname, "../logs/transacoes.log");

function registrarTransacao(hash, dados) {
  const linha = `[${new Date().toISOString()}] Hash: ${hash} | Dados: ${JSON.stringify(dados)}\n`;

  fs.appendFile(logPath, linha, err => {
    if (err) console.error("Erro ao registrar transação:", err.message);
  });
}

module.exports = { registrarTransacao };
