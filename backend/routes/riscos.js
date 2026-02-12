module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Risco = require("../models/Risco");
const autenticar = require("../../middleware/authMiddleware");

  router.post("/", autenticar, async (req, res) => {
    const risco = await Risco.create(req.body);
    io.emit("riscoCalculado", risco);
    res.status(201).json(risco);
  });

  return router;
};
