const mongoose = require("../mongo");

const apostaSchema = new mongoose.Schema({
  usuarioId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Usuario",
    required: true
  },

  esporte: { type: String, required: true },
  mercado: { type: String, required: true },
  odd: { type: Number, required: true },
  valor: { type: Number, required: true },

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
