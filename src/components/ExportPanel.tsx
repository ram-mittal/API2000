import React from 'react';
import { CalculatorInput, CalculationResults, UnitSystem } from '../types';
import { exportToPDF, exportToExcel } from '../utils';
import { Download, FileText, Sheet } from 'lucide-react';

interface ExportPanelProps {
  input: CalculatorInput;
  results: CalculationResults;
  unitSystem: UnitSystem;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ input, results, unitSystem }) => {
  const handlePDFExport = () => {
    exportToPDF(input, results, unitSystem);
  };

  const handleExcelExport = () => {
    exportToExcel(input, results, unitSystem);
  };

  return (
    <div className="export-panel">
      <h3>Export Results</h3>
      <div className="export-buttons">
        <button className="export-btn pdf-btn" onClick={handlePDFExport}>
          <FileText size={18} />
          <span>Export to PDF</span>
        </button>
        <button className="export-btn excel-btn" onClick={handleExcelExport}>
          <Sheet size={18} />
          <span>Export to Excel</span>
        </button>
      </div>
      <div className="export-info">
        <Download size={16} />
        <p>Download your calculation report in PDF or Excel format</p>
      </div>
    </div>
  );
};
