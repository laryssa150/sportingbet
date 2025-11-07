module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Engajamento = require("../models/Engajamento");
  const autenticar = require("../middleware/authMiddleware");

  router.post("/", autenticar, async (req, res) => {
    const novo = await Engajamento.create(req.body);
    io.emit("novoEngajamento", novo);
    res.status(201).json(novo);
  });

  return router;
};
