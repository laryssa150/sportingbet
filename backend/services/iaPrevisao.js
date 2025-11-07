function preverComportamento(usuario) {
  const score = usuario.totalApostado - usuario.totalGanho;
  const risco = score > 5000 ? "alto" : score > 1000 ? "médio" : "baixo";
  return {
    usuarioId: usuario.id,
    nome: usuario.nome,
    perfil: usuario.perfil,
    riscoComportamental: risco,
    justificativa: `Baseado em total apostado (${usuario.totalApostado}) e ganho (${usuario.totalGanho})`
  };
}
