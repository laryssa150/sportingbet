router.get("/campanha", autenticar, async (req, res) => {
  if (req.usuario.idade < 18) {
    return res.status(403).send("Campanha não disponível para menores de idade.");
  }
  res.json({ campanha: "Aposte & Ganhe" });
});
