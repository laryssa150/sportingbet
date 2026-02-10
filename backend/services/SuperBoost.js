function aplicarSuperBoost(oddOriginal, perfilUsuario = "normal") {
  const oddBase = Number(oddOriginal);

  if (!oddBase || oddBase <= 1) {
    return {
      sucesso: false,
      mensagem: "Odd original inválida"
    };
  }

  let multiplicador = 1.25;

  // Ajuste por perfil de risco
  if (perfilUsuario === "agressivo") multiplicador = 1.35;
  else if (perfilUsuario === "conservador") multiplicador = 1.15;

  let oddTurbinada = Number((oddBase * multiplicador).toFixed(2));

  // Margem de segurança
  if (oddTurbinada > 10.0) {
    oddTurbinada = 10.0;
  }

  return {
    sucesso: true,
    oddOriginal: oddBase,
    oddTurbinada,
    perfilUsuario,
    multiplicador
  };
}

module.exports = { aplicarSuperBoost };
