module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Saque = require("../models/Saque");
  const autenticar = require("../middleware/authMiddleware");
  const registrarLog = require("../middleware/logAuditoria");

  // Solicitação de saque
  router.post(
    "/",
    autenticar,
    registrarLog(io, "Saque solicitado", "Usuário solicitou saque via Pix"),
    async (req, res) => {
      const { valor, chavePix } = req.body;

      const saque = await Saque.create({
        usuario: req.usuario.id,
        valor,
        chavePix,
        status: "solicitado"
      });

      io.emit("novoSaque", saque); // 🔔 Emite evento para frontend
      res.status(201).json(saque);
    }
  );

  return router;
};
