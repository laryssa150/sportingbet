module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const { preverComportamento } = require("../routes/ia");
const autenticar = require("../../middleware/authMiddleware");
  const registrarLog = require("../middleware/logAuditoria");

  router.post(
    "/prever",
    autenticar,
    registrarLog(io, "Previsão histórica", "IA gerou previsão com base em histórico"),
    async (req, res) => {
      const { historico } = req.body; // Ex: [10, 12, 15, 20, 18]
      const resultado = await preverComportamento(historico);

      io.emit("previsaoGerada", { historico, resultado });
      res.json({ previsao: resultado });
    }
  );

  return router;
};


