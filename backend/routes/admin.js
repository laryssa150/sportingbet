module.exports = function (io) { 
  const express = require("express");
  const router = express.Router();
  const { autenticar } = require("../../middleware/authMiddleware");
  const AdminLog = require("../models/AdminLog");

  router.post("/acao", autenticar, async (req, res) => {
    try {
      const { tipo, descricao } = req.body;

      const log = await AdminLog.create({
        tipo,
        descricao,
        admin: req.usuario.id,
        criadoEm: new Date()
      });

      io.emit("acaoAdmin", log);
      res.status(201).json(log);

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao registrar ação administrativa" });
    }
  });

  return router;
};
