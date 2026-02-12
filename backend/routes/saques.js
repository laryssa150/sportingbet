module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Saque = require("../models/Saque");
  const autenticar = require("../../middleware/authMiddleware");


  router.post("/", autenticar, async (req, res) => {
    try {
      const { valor, chavePix } = req.body;

      const saque = await Saque.create({
        usuario: req.usuario.id,
        valor,
        chavePix,
        status: "solicitado"
      });

      io.emit("novoSaque", saque);

      res.status(201).json(saque);
    } catch (err) {
      console.error(err);
      res.status(500).json({ erro: "Erro ao solicitar saque" });
    }
  });

  return router;
};
