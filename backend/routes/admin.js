module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const autenticar = require("../middleware/authMiddleware");
  const AdminLog = require("../models/AdminLog");

  // Exemplo: registrar uma ação administrativa
  router.post("/acao", autenticar, async (req, res) => {
    const { tipo, descricao } = req.body;

    const log = await AdminLog.create({
      tipo,
      descricao,
      admin: req.usuario.id,
      criadoEm: new Date()
    });

    io.emit("acaoAdmin", log); // 🔔 Notificação para o frontend
    res.status(201).json(log);
  });

  return router;
};
