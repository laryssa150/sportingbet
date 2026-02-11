module.exports = function (io) {
  const express = require("express");
  const router = express.Router();
  const SuperSocial = require("../models/SuperSocial");
  const { autenticar } = require("../../middleware/authMiddleware");
;

  router.post("/", autenticar, async (req, res) => {
    const registro = await SuperSocial.create(req.body);
    io.emit("superSocialPostado", registro);
    res.status(201).json(registro);
  });

  return router;
};
