const mongoose = require("mongoose");

const AdminLogSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    trim: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin", // ou "Admin" se você tiver model separado
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

AdminLogSchema.index({ criadoEm: -1 });


module.exports = mongoose.model("AdminLog", AdminLogSchema);
