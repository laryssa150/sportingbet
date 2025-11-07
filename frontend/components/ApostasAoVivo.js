function ApostasAoVivo() {
  const odds = [1.85, 2.10, 3.25]; // Simulação com cache
  return (
    <div>
      <h2>Ao Vivo</h2>
      {odds.map((odd, i) => (
        <p key={i}>Odd: {odd}</p>
      ))}
    </div>
  );
}
export default ApostasAoVivo;