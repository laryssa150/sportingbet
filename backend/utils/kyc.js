function validarKYC(documento, selfie) {
  return documento && selfie && documento.match(/CPF|RG/);
}