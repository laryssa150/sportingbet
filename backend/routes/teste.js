module.exports = function (io) {
  const express = require("express");
  const router = express.Router();

  router.post("/ping", (req, res) => {
    io.emit("testePing", { mensagem: "Ping recebido!" });
    res.json({ sucesso: true });
  });

  return router;
};
