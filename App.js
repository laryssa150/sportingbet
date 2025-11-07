const { exec } = require("child_process");
const path = require("path");
 
// Inicializa o backend
const iniciarBackend = () => {
  const backendPath = path.join(__dirname, "backend");
  const comando = process.platform === "win32" ? "npm.cmd" : "npm";
 
  const backend = exec(`${comando} run dev`, { cwd: backendPath });
 
  backend.stdout.on("data", data => console.log(`[BACKEND] ${data}`));
  backend.stderr.on("data", data => console.error(`[BACKEND ERROR] ${data}`));
};
 
// Inicializa o frontend
const iniciarFrontend = () => {
  const frontendPath = path.join(__dirname, "frontend");
  const comando = process.platform === "win32" ? "npm.cmd" : "npm";
 
  const frontend = exec(`${comando} start`, { cwd: frontendPath });
 
  frontend.stdout.on("data", data => console.log(`[FRONTEND] ${data}`));
  frontend.stderr.on("data", data => console.error(`[FRONTEND ERROR] ${data}`));
};
 
// Inicia ambos
console.log("🚀 Iniciando SuperBet...");
iniciarBackend();
iniciarFrontend();


 
