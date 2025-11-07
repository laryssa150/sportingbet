module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const Usuario = require("../models/Usuario");
  const jwt = require("jsonwebtoken");

  // Registro de novo usuário
  router.post("/registro", async (req, res) => {
    try {
      const novoUsuario = await Usuario.create(req.body);

      // Emite evento de novo registro
      io.emit("usuarioRegistrado", {
        id: novoUsuario._id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        perfil: novoUsuario.perfil
      });

      res.status(201).json(novoUsuario);
    } catch (err) {
      res.status(400).json({ erro: "Erro ao registrar usuário", detalhes: err.message });
    }
  });

  // Login de usuário
  router.post("/login", async (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ email });

      if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

      const senhaValida = await usuario.validarSenha(senha);
      if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

      const token = jwt.sign({ id: usuario._id, perfil: usuario.perfil }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });

      // Emite evento de login
      io.emit("usuarioLogado", {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao fazer login", detalhes: err.message });
    }
  });

  return router;
};
