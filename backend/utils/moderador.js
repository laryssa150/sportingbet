const palavrasProibidas = ["palavrão1", "palavrão2"];
function moderar(texto) {
  return palavrasProibidas.some(p => texto.toLowerCase().includes(p));
}
module.exports = { moderar };
