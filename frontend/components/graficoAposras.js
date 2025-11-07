import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
 
function GraficoApostas() {
  const [dados, setDados] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/apostas")
      .then(res => res.json())
      .then(setDados);
  }, []);
 
  const agrupado = dados.reduce((acc, aposta) => {
    acc[aposta.esporte] = (acc[aposta.esporte] || 0) + 1;
    return acc;
  }, {});
 
  const chartData = {
    labels: Object.keys(agrupado),
    datasets: [{ label: "Apostas por Esporte", data: Object.values(agrupado) }],
  };
 
  return <Bar data={chartData} />;
}
 
export default GraficoApostas;