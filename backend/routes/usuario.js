const express = require("express");
const router = express.Router();
const { autenticar } = require("../middleware/auth");

router.post("/consentimento", autenticar, async (req, res) => {
  await Usuario.update({ consentiuLGPD: true }, { where: { id: req.usuario.id } });
  res.sendStatus(200);
});

module.exports = router;
