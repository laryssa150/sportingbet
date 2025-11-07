const crypto = require("crypto");
function criptografarLog(log, chave) {
  const cipher = crypto.createCipheriv("aes-256-cbc", chave, Buffer.alloc(16, 0));
  let criptografado = cipher.update(log, "utf8", "hex");
  criptografado += cipher.final("hex");
  return criptografado;
}