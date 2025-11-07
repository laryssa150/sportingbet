module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Mercado = require("../models/Mercado");
  const autenticar = require("../middleware/authMiddleware");

  router.post("/", autenticar, async (req, res) => {
    const mercado = await Mercado.create(req.body);
    io.emit("mercadoCriado", mercado);
    res.status(201).json(mercado);
  });

  return router;
};
