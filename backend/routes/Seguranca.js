module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const EventoSeguranca = require("../models/EventoSeguranca");
  const { autenticar } = require("../../middleware/authMiddleware");
;

  router.post("/", autenticar, async (req, res) => {
    const evento = await EventoSeguranca.create(req.body);
    io.emit("eventoSeguranca", evento);
    res.status(201).json(evento);
  });

  return router;
};
