function aplicarSuperBoost(oddOriginal, perfilUsuario = "normal") {
  let multiplicador = 1.25;
 
  // Ajuste por perfil de risco
  if (perfilUsuario === "agressivo") multiplicador = 1.35;
  if (perfilUsuario === "conservador") multiplicador = 1.15;
 
  const oddTurbinada = parseFloat((oddOriginal * multiplicador).toFixed(2));
 
  // Margem de segurança: odds não podem ultrapassar 10.0
  if (oddTurbinada > 10.0) {
    return {
      sucesso: false,
      mensagem: "Odd turbinada excede limite permitido",
      oddFinal: 10.0
    };
  }
 
  return {
    sucesso: true,
    oddOriginal,
    oddTurbinada,
    perfilUsuario
  };
}
 
module.exports = { aplicarSuperBoost };
 