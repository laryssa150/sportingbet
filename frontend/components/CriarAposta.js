function CriarAposta() {
  return (
    <form>
      <input placeholder="Evento" />
      <select>
        <option>Resultado Correto</option>
        <option>Handicap</option>
      </select>
      <input type="number" placeholder="Odd" />
      <button>Criar Aposta</button>
    </form>
  );
}
export default CriarAposta;