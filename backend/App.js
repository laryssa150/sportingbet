const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
require("./mongo"); // Conexão com MongoDB

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Servidor HTTP e Socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Função para importar rotas com verificação
function usarRota(caminho, rotaPath) {
  try {
    const rota = require(rotaPath);
    if (typeof rota !== "function") throw new Error(`${rotaPath} não exporta uma função`);
    app.use(caminho, rota(io));
  } catch (err) {
    console.error(`❌ Erro ao carregar rota ${caminho}:`, err.message);
  }
}

// ROTAS COM EMISSÃO DE EVENTOS
usarRota("/api/apostas", "./routes/apostas");
usarRota("/api/pagamentos", "./routes/pagamentos");
usarRota("/api/saques", "./routes/saques");
usarRota("/api/campanhas", "./routes/campanhas");
usarRota("/api/seguranca", "./routes/seguranca");
usarRota("/api/engajamento", "./routes/engajamento");
usarRota("/api/margem", "./routes/margem");
usarRota("/api/riscos", "./routes/riscos");
usarRota("/api/relatorios", "./routes/relatorios");
usarRota("/api/ia", "./routes/ia");
usarRota("/api/supersocial", "./routes/supersocial");
usarRota("/api/teste", "./routes/teste");
usarRota("/api/usuarios", "./routes/usuario");
usarRota("/api/mercado", "./routes/mercado");
usarRota("/api/admin", "./routes/admin");
usarRota("/api/webhook", "./routes/webhookPix");

// SOCKET.IO: conexão e desconexão
io.on("connection", socket => {
  console.log("🔔 Cliente conectado via Socket.io:", socket.id);

  socket.on("disconnect", () => {
    console.log(`🔔 Cliente desconectado: ${socket.id}`);
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error("🔥 ERRO GLOBAL:", err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

// Inicia servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 SuperBet rodando com notificações na porta ${PORT}`);
});
