module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Engajamento = require("./engajamento");
  const autenticar = require("../../middleware/authMiddleware");

  router.post("/", autenticar, async (req, res) => {
    try {
      const novo = await Engajamento.create(req.body);
      io.emit("novoEngajamento", novo);
      res.status(201).json(novo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar engajamento" });
    }
  });

  return router;
};
