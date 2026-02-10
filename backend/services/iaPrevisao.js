function preverComportamento(usuario) {
  if (!usuario) {
    throw new Error("Usuário não informado");
  }

  const totalApostado = Number(usuario.totalApostado) || 0;
  const totalGanho = Number(usuario.totalGanho) || 0;

  const score = totalApostado - totalGanho;

  let risco = "baixo";
  if (score > 5000) {
    risco = "alto";
  } else if (score > 1000) {
    risco = "médio";
  }

  return {
    usuarioId: usuario.id,
    nome: usuario.nome,
    perfil: usuario.perfil,
    riscoComportamental: risco,
    justificativa: `Baseado em total apostado (${totalApostado}) e ganho (${totalGanho})`
  };
}

module.exports = { preverComportamento };
