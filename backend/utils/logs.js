const crypto = require("crypto");

/**
 * Criptografa um log usando AES-256-CBC
 * Retorna hex com IV + ciphertext
 */
function criptografarLog(log, chave) {
  if (!log || !chave) throw new Error("Log e chave são obrigatórios");
  
  // Garante que a chave tem 32 bytes
  const key = crypto.createHash("sha256").update(chave).digest();

  // IV aleatório
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let criptografado = cipher.update(log, "utf8", "hex");
  criptografado += cipher.final("hex");

  // Retorna IV + ciphertext juntos (hex)
  return iv.toString("hex") + criptografado;
}

/**
 * Descriptografa um log criptografado com a função acima
 */
function descriptografarLog(criptografado, chave) {
  const key = crypto.createHash("sha256").update(chave).digest();

  // Extrai IV (primeiros 32 caracteres = 16 bytes em hex)
  const iv = Buffer.from(criptografado.slice(0, 32), "hex");
  const ciphertext = criptografado.slice(32);

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let log = decipher.update(ciphertext, "hex", "utf8");
  log += decipher.final("utf8");

  return log;
}

module.exports = { criptografarLog, descriptografarLog };
