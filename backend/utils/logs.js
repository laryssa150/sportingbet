const crypto = require("crypto");
const key = Buffer.from(process.env.CRYPTO_KEY, "hex");

function criptografarLog(log) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(log, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}

module.exports = { criptografarLog };
