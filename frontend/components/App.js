import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CassinoIframe from "./components/CassinoIframe";
import ExportarApostas from "./components/ExportarApostas";
import GraficoApostas from "./components/GraficoApostas";
import GraficoEngajamento from "./components/GraficoEngajamento";
import SimuladorMargem from "./components/SimuladorMargem";
import PainelRiscoPerfil from "./components/PainelRiscoPerfil";
import DashboardExecutivo from "./components/DashboardExecutivo";
import PrevisaoComportamento from "./components/PrevisaoComportamento";
import PainelFinanceiro from "./components/PainelFinanceiro";
import Login from "./Login";
import Registro from "./registro"; // Corrigido: maiúscula no nome do componente
import Notificacoes from "./Notificacoes";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Notificacoes />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} /> {/* Corrigido: rota minúscula */}
        <Route
          path="/dashboard"
          element={
            token ? (
              <main>
                <CassinoIframe />
                <GraficoApostas />
                <ExportarApostas />
                <GraficoEngajamento />
                <SimuladorMargem />
                <PainelRiscoPerfil />
                <DashboardExecutivo />
                <PrevisaoComportamento />
                <PainelFinanceiro />
              </main>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
