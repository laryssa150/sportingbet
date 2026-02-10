function detectarPadraoSuspeito(usuario) {
  if (!usuario) {
    throw new Error("Usuário não informado");
  }

  const saquesRecentes = usuario.saquesRecentes || [];
  const apostasRecentes = usuario.apostasRecentes || [];

  const muitosSaques = saquesRecentes.length > 3;
  const apostasAltas =
    apostasRecentes.length > 0 &&
    apostasRecentes.every(aposta => Number(aposta.valor) > 1000);

  if (muitosSaques && apostasAltas) {
    return {
      alerta: true,
      mensagem: `Usuário ${usuario.nome} com padrão de risco elevado`
    };
  }

  return { alerta: false };
}

module.exports = { detectarPadraoSuspeito };
