const mongoose = require("mongoose");
 
const SaqueSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  valor: { type: Number, required: true },
  chavePix: { type: String, required: true },
  status: { type: String, enum: ["solicitado", "processando", "concluído", "negado"], default: "solicitado" },
  criadoEm: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model("Saque", SaqueSchema);
 