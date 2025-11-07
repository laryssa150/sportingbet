import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
 
function ExportarApostas({ apostas }) {
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Apostas", 10, 10);
    doc.autoTable({
      head: [["Esporte", "Mercado", "Valor", "Odd"]],
      body: apostas.map(a => [a.esporte, a.mercado, a.valor, a.odd]),
    });
    doc.save("apostas.pdf");
  };
 
  return (
    <div>
      <CSVLink data={apostas} filename="apostas.csv">Exportar CSV</CSVLink>
      <button onClick={exportarPDF}>Exportar PDF</button>
    </div>
  );
}