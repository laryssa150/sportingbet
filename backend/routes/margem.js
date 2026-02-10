module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Margem = require("../models/Margem");
  const autenticar = require("../../middleware/authMiddleware");

  router.post("/", autenticar, async (req, res) => {
    const simulacao = await Margem.create(req.body);
    io.emit("margemSimulada", simulacao);
    res.status(201).json(simulacao);
  });

  return router;
};
