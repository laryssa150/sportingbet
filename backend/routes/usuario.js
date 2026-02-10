module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Usuario = require("../models/Usuario");
  const jwt = require("jsonwebtoken");

  // Registro de novo usuário
  router.post("/registro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: "Nome, e-mail e senha são obrigatórios"
      });
    }

    // Criação do usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha
    });

    const usuarioPublico = {
      id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      perfil: novoUsuario.perfil
    };

    // Evento Socket.io
    io.emit("usuarioRegistrado", usuarioPublico);

    // Resposta sem dados sensíveis
    res.status(201).json(usuarioPublico);

  } catch (err) {
    // E-mail duplicado (MongoDB)
    if (err.code === 11000) {
      return res.status(400).json({
        erro: "Este e-mail já está cadastrado"
      });
    }

    console.error("Erro ao registrar usuário:", err);

    res.status(500).json({
      erro: "Erro interno ao registrar usuário"
    });
  }
});

 return router;
}