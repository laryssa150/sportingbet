const mongoose = require("mongoose");
require("dotenv").config();

const conectarMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro na conexão com MongoDB:", err);
    console.log("♻️ Tentando reconectar em 5s...");
    setTimeout(conectarMongo, 5000); // tenta reconectar
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB desconectado. Reconectando...");
  conectarMongo();
});

conectarMongo();

module.exports = mongoose;
