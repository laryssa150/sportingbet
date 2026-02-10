function validarKYC(documento, selfie) {
  // Verifica se os dados existem
  if (!documento || !selfie) return false;

  // Valida tipo de documento (CPF ou RG)
  const padraoDocumento = /^(CPF|RG)$/i; // apenas "CPF" ou "RG"
  return padraoDocumento.test(documento);
}

function validarCPF(cpf) {
  // Remove tudo que não é número
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  // Aqui poderia implementar cálculo de dígitos verificadores
  return true;
}


module.exports = { validarKYC };
