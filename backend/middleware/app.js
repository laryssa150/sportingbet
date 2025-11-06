const express = require("express");
const app = express();
app.use(express.json());

app.use("/usuario", require("./routes/usuario"));
app.use("/campanhas", require("./routes/campanhas"));

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
