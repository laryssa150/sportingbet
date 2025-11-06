const express = require("express");
const router = express.Router();
const { moderar } = require("../utils/moderador");

router.post("/comentario", (req, res) => {
  const { texto } = req.body;
  if (moderar(texto)) {
    return res.status(400).send("Comentário bloqueado por conteúdo ofensivo.");
  }
  res.send("Comentário publicado.");
});

module.exports = router;
