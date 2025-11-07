const mongoose = require("mongoose");
require("dotenv").config();
 
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
 
mongoose.connection.once("open", () => {
  console.log("✅ Conectado ao MongoDB");
});
 
mongoose.connection.on("error", err => {
  console.error("❌ Erro na conexão com MongoDB:", err);
});
 
module.exports = mongoose