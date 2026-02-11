module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Pagamento = require("../models/Pagamento");
  const { autenticar } = require("../../middleware/authMiddleware");  
  const { gerarCobrancaPix } = require("../services/openPix");

  router.post("/", autenticar, async (req, res) => {
    const { valor, descricao } = req.body;
    const cobranca = await gerarCobrancaPix(valor, descricao);
    const pagamento = await Pagamento.create({
      usuario: req.usuario.id,
      valor,
      descricao,
      pixId: cobranca.charge.id,
      status: "pendente"
    });
    io.emit("novoPagamento", pagamento);
    res.status(201).json({ pagamento, cobranca });
  });

  return router;
};
