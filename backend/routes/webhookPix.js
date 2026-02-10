module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Pagamento = require("../models/Pagamento");
  const fs = require("fs");
  const path = require("path");

  const logsDir = path.join(__dirname, "../logs");
  const logPath = path.join(logsDir, "webhook.log");

  // Garante que a pasta de logs exista
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  function registrarLog(mensagem) {
    const linha = `[${new Date().toISOString()}] ${mensagem}\n`;
    fs.appendFile(logPath, linha, err => {
      if (err) console.error("Erro ao salvar log:", err.message);
    });
  }

  // Webhook da OpenPix
  router.post("/pix", async (req, res) => {
    const tokenRecebido = req.headers["x-webhook-token"];
    const tokenEsperado = process.env.OPENPIX_WEBHOOK_TOKEN;

    if (tokenRecebido !== tokenEsperado) {
      registrarLog(`❌ Token inválido: ${tokenRecebido}`);
      return res.status(403).json({ erro: "Token inválido" });
    }

    const { charge } = req.body;

    if (!charge?.id) {
      registrarLog("⚠️ Webhook recebido com dados incompletos");
      return res.status(400).json({ erro: "Dados inválidos do webhook" });
    }

    try {
      const pagamento = await Pagamento.findOneAndUpdate(
        { pixId: charge.id },
        { status: "confirmado" },
        { new: true }
      );

      if (pagamento) {
        io.emit("pagamentoConfirmado", pagamento);
        registrarLog(`✅ Pagamento confirmado: ${pagamento._id}`);
      } else {
        registrarLog(`⚠️ Pagamento não encontrado para Pix ID: ${charge.id}`);
      }

      res.json({ sucesso: true });
    } catch (err) {
      registrarLog(`❌ Erro interno: ${err.message}`);
      res.status(500).json({ erro: "Erro interno" });
    }
  });

  return router;
};
