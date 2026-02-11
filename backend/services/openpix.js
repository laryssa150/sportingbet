const axios = require("axios");

async function gerarCobrancaPix(valor, descricao) {
  try {
    if (!process.env.OPENPIX_TOKEN) {
      throw new Error("OPENPIX_TOKEN não configurado no .env");
    }

    const response = await axios.post(
      "https://api.openpix.com.br/api/v1/charge",
      {
        correlationID: `superbet-${Date.now()}`, // importante para controle
        value: valor,
        comment: descricao
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENPIX_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Erro ao gerar cobrança Pix:",
      error.response?.data || error.message
    );

    throw new Error("Falha ao gerar cobrança Pix");
  }
}

module.exports = { gerarCobrancaPix };
