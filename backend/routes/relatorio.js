module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Relatorio = require("../models/Relatorio");
  const { autenticar } = require("../../middleware/authMiddleware");
;

  router.post("/", autenticar, async (req, res) => {
    const relatorio = await Relatorio.create(req.body);
    io.emit("relatorioGerado", relatorio);
    res.status(201).json(relatorio);
  });

  return router;
};
