module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Aposta = require("../models/Aposta");
  const autenticar = require("../../middleware/authMiddleware");

  router.post("/", autenticar, async (req, res) => {
  try {
    const nova = await Aposta.create({
      ...req.body,
      usuario: req.usuario.id
    });

    io.emit("novaAposta", nova);
    res.status(201).json(nova);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar aposta" });
  }
});

 return router;
}