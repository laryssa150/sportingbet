import GraficoEngajamento from "./components/GraficoEngajamento";
import SimuladorMargem from "./components/SimuladorMargem";
import PainelRiscoPerfil from "./components/PainelRiscoPerfil";
import DashboardExecutivo from "./components/DashboardExecutivo";
import PrevisaoComportamento from "./components/PrevisaoComportamento";
 
function App() {
  return (
    <main>
      <GraficoEngajamento />
      <SimuladorMargem />
      <PainelRiscoPerfil />
      <DashboardExecutivo />
      <PrevisaoComportamento />
    </main>
  );
}