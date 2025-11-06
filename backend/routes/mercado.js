const express = require("express");
const router = express.Router();

router.post("/validar", (req, res) => {
  const { odds } = req.body;
  if (odds < 1.10 || odds > 100.00) {
    return res.status(400).send("Odds fora dos limites permitidos.");
  }
  res.send("Odds válidas.");
});

module.exports = router;
