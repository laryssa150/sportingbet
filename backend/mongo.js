const mongoose = require("mongoose");
const path = require("path");

// 🔐 Carrega o .env da raiz do projeto
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});

const conectarMongo = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL não definida no .env");
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro na conexão com MongoDB:", err.message);
    console.log("♻️ Tentando reconectar em 5s...");
    setTimeout(conectarMongo, 5000);
  }
};

// 🔄 Se desconectar, tenta reconectar
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB desconectado. Reconectando...");
  conectarMongo();
});

conectarMongo();

module.exports = mongoose;
