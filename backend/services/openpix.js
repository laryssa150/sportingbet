const axios = require("axios");

async function gerarCobrancaPix(valor, descricao) {
  const response = await axios.post(
    "https://api.openpix.com.br/api/v1/charge",
    {
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
}

module.exports = { gerarCobrancaPix };
