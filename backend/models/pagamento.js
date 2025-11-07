const mongoose = require("mongoose");
 
const PagamentoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  valor: { type: Number, required: true },
  descricao: { type: String },
  status: { type: String, enum: ["pendente", "confirmado", "cancelado"], default: "pendente" },
  pixId: { type: String },
  criadoEm: { type: Date, default: Date.now }
});
 
module.exports = mongoose.model("Pagamento", PagamentoSchema);
 