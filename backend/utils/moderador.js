const palavrasProibidas = ["ódio", "violência", "fraude", "spam", "terrorismo"];

/**
 * Verifica se um texto contém palavras proibidas ou excede o limite de caracteres
 * @param {string} texto - Texto a ser verificado
 * @param {number} limite - Limite máximo de caracteres (padrão: 280)
 * @returns {object} { permitido: boolean, motivo: string }
 */
function verificarConteudo(texto, limite = 280) {
  if (!texto || typeof texto !== "string") {
    return { permitido: false, motivo: "Texto inválido" };
  }

  // Normaliza o texto (minúsculas + remover acentos)
  const textoNormalizado = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove acentos

  // Checa palavras proibidas
  const violacoes = palavrasProibidas.filter(palavra =>
    textoNormalizado.includes(palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
  );

  if (violacoes.length > 0) {
    return {
      permitido: false,
      motivo: `Conteúdo bloqueado por conter: ${violacoes.join(", ")}`
    };
  }

  // Checa limite de caracteres
  if (texto.length > limite) {
    return {
      permitido: false,
      motivo: `Texto excede o limite de ${limite} caracteres`
    };
  }

  return { permitido: true, motivo: "Conteúdo aprovado" };
}

module.exports = { verificarConteudo };
