const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
require("dotenv").config();
require("./mongo"); // Conecta ao MongoDB

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// ROTAS COM EMISSÃO DE EVENTOS
app.use("/api/apostas", require("./routes/apostas")(io));
app.use("/api/pagamentos", require("./routes/pagamentos")(io));
app.use("/api/saques", require("./routes/saques")(io));
app.use("/api/campanhas", require("./routes/campanhas")(io));
app.use("/api/seguranca", require("./routes/seguranca")(io));
app.use("/api/engajamento", require("./routes/engajamento")(io));
app.use("/api/margem", require("./routes/margem")(io));
app.use("/api/riscos", require("./routes/riscos")(io));
app.use("/api/relatorios", require("./routes/relatorios")(io));
app.use("/api/ia", require("./routes/ia")(io));
app.use("/api/supersocial", require("./routes/supersocial")(io));
app.use("/api/teste", require("./routes/teste")(io));
app.use("/api/usuarios", require("./routes/usuario")(io));
app.use("/api/mercado", require("./routes/mercado")(io));
app.use("/api/admin", require("./routes/admin")(io));
app.use("/api/webhook", require("./routes/webhookPix")(io));


// SOCKET.IO CONEXÃO
io.on("connection", socket => {
  console.log("🔔 Cliente conectado via Socket.io:", socket.id);
});

// INICIA SERVIDOR
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 SuperBet rodando com notificações na porta ${PORT}`);
});
