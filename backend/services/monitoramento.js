function detectarPadraoSuspeito(usuario) {
  if (usuario.saquesRecentes.length > 3 && usuario.apostasRecentes.every(a => a.valor > 1000)) {
    return {
      alerta: true,
      mensagem: `Usuário ${usuario.nome} com padrão de risco elevado`
    };
  }
  return { alerta: false };
}

module.exports = { detectarPadraoSuspeito };
