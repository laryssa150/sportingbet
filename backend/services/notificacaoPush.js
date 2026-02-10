function enviarNotificacao(io, usuarioId, mensagem) {
  if (!usuarioId || !mensagem) return;

  io.to(String(usuarioId)).emit("notificacao", {
    mensagem,
    data: new Date()
  });
}

module.exports = { enviarNotificacao };
