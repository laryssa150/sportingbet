const palavrasProibidas = ["ódio", "violência", "fraude", "spam", "terrorismo"];
 
function verificarConteudo(texto) {
  const textoNormalizado = texto.toLowerCase();
 
  const violacoes = palavrasProibidas.filter(palavra =>
    textoNormalizado.includes(palavra)
  );
 
  if (violacoes.length > 0) {
    return {
      permitido: false,
      motivo: `Conteúdo bloqueado por conter: ${violacoes.join(", ")}`
    };
  }
 
  if (texto.length > 280) {
    return {
      permitido: false,
      motivo: "Texto excede o limite de 280 caracteres"
    };
  }
 
  return {
    permitido: true,
    motivo: "Conteúdo aprovado"
  };
}
 
module.exports = { verificarConteudo };