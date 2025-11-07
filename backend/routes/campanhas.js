module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Campanha = require("../models/Campanha");
  const autenticar = require("../middleware/authMiddleware");
  const registrarLog = require("../middleware/logAuditoria");

  // Criação de campanha
  router.post(
    "/",
    autenticar,
    registrarLog(io, "Campanha criada", "Usuário criou uma nova campanha"),
    async (req, res) => {
      const nova = await Campanha.create(req.body);
      io.emit("campanhaCriada", nova); // 🔔 Emite evento para frontend
      res.status(201).json(nova);
    }
  );

  return router;
};
