const mongoose = require("../mongo");
 
const apostaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  esporte: String,
  mercado: String,
  odd: Number,
  valor: Number,
  status: {
    type: String,
    enum: ["pendente", "ganhou", "perdeu", "cancelada"],
    default: "pendente"
  },
  resultado: String,
  dataCriacao: { type: Date, default: Date.now },
  dataResolucao: Date
});
 
module.exports = mongoose.model("Aposta", apostaSchema);