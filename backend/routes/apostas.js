module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Aposta = require("../models/Aposta");
  const autenticar = require("../../middleware/authMiddleware");


  // ✅ Criar aposta
  router.post("/", autenticar, async (req, res) => {
    try {
      const { esporte, mercado, odd, valor } = req.body;

      const novaAposta = await Aposta.create({
        usuarioId: req.usuario.id,
        esporte,
        mercado,
        odd,
        valor
      });

      io.emit("novaAposta", novaAposta);

      res.status(201).json(novaAposta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao criar aposta" });
    }
  });

  // ✅ Listar apostas do usuário logado
  router.get("/minhas", autenticar, async (req, res) => {
    try {
      const apostas = await Aposta.find({
        usuarioId: req.usuario.id
      }).sort({ dataCriacao: -1 });

      res.json(apostas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar apostas" });
    }
  });

  // ✅ Listar todas apostas (admin)
  router.get("/", autenticar, async (req, res) => {
    try {
      const apostas = await Aposta.find()
        .populate("usuarioId", "nome email")
        .sort({ dataCriacao: -1 });

      res.json(apostas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao listar apostas" });
    }
  });

  // ✅ Resolver aposta
  router.put("/:id/resolver", autenticar, async (req, res) => {
    try {
      const { status, resultado } = req.body;

      const aposta = await Aposta.findByIdAndUpdate(
        req.params.id,
        {
          status,
          resultado,
          dataResolucao: new Date()
        },
        { new: true }
      );

      io.emit("apostaResolvida", aposta);

      res.json(aposta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao resolver aposta" });
    }
  });

  // ✅ Cancelar aposta
  router.put("/:id/cancelar", autenticar, async (req, res) => {
    try {
      const aposta = await Aposta.findByIdAndUpdate(
        req.params.id,
        { status: "cancelada" },
        { new: true }
      );

      io.emit("apostaCancelada", aposta);

      res.json(aposta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao cancelar aposta" });
    }
  });

  return router;
};
