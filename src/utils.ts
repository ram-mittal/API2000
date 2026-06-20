import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { CalculatorInput, CalculationResults, UnitSystem } from './types';

/**
 * Unit conversion utilities
 */
export const unitConversions = {
  // Length conversions
  metersToFeet: (m: number) => m * 3.28084,
  feetToMeters: (ft: number) => ft / 3.28084,
  
  // Volume conversions
  m3ToGallons: (m3: number) => m3 * 264.172,
  gallonsToM3: (gal: number) => gal / 264.172,
  m3ToLiters: (m3: number) => m3 * 1000,
  litersToM3: (l: number) => l / 1000,
  
  // Temperature conversions
  celsiusToFahrenheit: (c: number) => (c * 9) / 5 + 32,
  fahrenheitToCelsius: (f: number) => ((f - 32) * 5) / 9,
  
  // Pressure conversions
  mbarToBar: (mbar: number) => mbar / 1000,
  barToMbar: (bar: number) => bar * 1000,
  barToPsi: (bar: number) => bar * 14.5038,
  psiToBar: (psi: number) => psi / 14.5038,
  
  // Flow rate conversions
  nm3HrToScfm: (nm3hr: number) => (nm3hr / 1.6990) * 0.59, // Nm³/hr to SCFM
  scfmToNm3Hr: (scfm: number) => (scfm / 0.59) * 1.6990,
};

/**
 * Format numbers for display
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Export results to PDF
 */
export const exportToPDF = (
  input: CalculatorInput,
  results: CalculationResults,
  unitSystem: UnitSystem = 'metric'
): void => {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 20;
  
  const addTitle = (text: string) => {
    doc.setFontSize(14);
    doc.setFont('Arial', 'bold');
    doc.text(text, 20, yPos);
    yPos += 12;
  };
  
  const addSection = (title: string) => {
    doc.setFontSize(11);
    doc.setFont('Arial', 'bold');
    doc.text(title, 20, yPos);
    yPos += 8;
  };
  
  const addLine = (label: string, value: string) => {
    doc.setFontSize(10);
    doc.setFont('Arial', 'normal');
    doc.text(`${label}:`, 25, yPos);
    doc.text(value, 120, yPos);
    yPos += 7;
  };
  
  // Title
  addTitle('API 2000 Venting Calculator Report');
  yPos += 3;
  
  // Tank Information
  addSection('Tank Information');
  addLine('Tank Type', input.tank.type);
  addLine(
    'Diameter',
    unitSystem === 'metric'
      ? `${input.tank.diameter} m`
      : `${formatNumber(unitConversions.metersToFeet(input.tank.diameter))} ft`
  );
  addLine(
    'Height',
    unitSystem === 'metric'
      ? `${input.tank.height} m`
      : `${formatNumber(unitConversions.metersToFeet(input.tank.height))} ft`
  );
  addLine(
    'Design Pressure',
    `${formatNumber(input.tank.designPressure)} mbar (${formatNumber(unitConversions.mbarToBar(input.tank.designPressure), 3)} bar)`
  );
  addLine(
    'Design Vacuum',
    `${formatNumber(input.tank.designVacuum)} mbar`
  );
  
  yPos += 3;
  
  // Product Information
  addSection('Product Information');
  addLine('Product', input.product.name);
  addLine('Molecular Weight', `${input.product.molecularWeight} g/mol`);
  addLine(
    'Vapor Pressure (@ 20°C)',
    `${formatNumber(input.product.vaporPressure, 3)} bar`
  );
  
  yPos += 3;
  
  // Operating Conditions
  addSection('Operating Conditions');
  addLine(
    'Max Filling Rate',
    unitSystem === 'metric'
      ? `${input.operating.maxFillingRate} m³/hr`
      : `${formatNumber(unitConversions.m3ToGallons(input.operating.maxFillingRate))} gal/hr`
  );
  addLine(
    'Max Emptying Rate',
    unitSystem === 'metric'
      ? `${input.operating.maxEmptyingRate} m³/hr`
      : `${formatNumber(unitConversions.m3ToGallons(input.operating.maxEmptyingRate))} gal/hr`
  );
  addLine(
    'Temperature Range',
    `${input.operating.minAmbientTemp}°C to ${input.operating.maxAmbientTemp}°C`
  );
  
  yPos += 3;
  
  // Check if we need a new page
  if (yPos > pageHeight - 60) {
    doc.addPage();
    yPos = 20;
  }
  
  // Results
  addSection('Calculation Results');
  addLine(
    'Tank Volume',
    unitSystem === 'metric'
      ? `${formatNumber(results.tankVolume)} m³`
      : `${formatNumber(unitConversions.m3ToGallons(results.tankVolume))} gallons`
  );
  addLine(
    'Wetted Surface Area',
    `${formatNumber(results.wettedSurfaceArea)} m²`
  );
  
  yPos += 3;
  
  addSection('Venting Requirements');
  addLine('Inbreathing', `${formatNumber(results.inbreathingRequirement)} Nm³/hr`);
  addLine('Outbreathing', `${formatNumber(results.outbreathingRequirement)} Nm³/hr`);
  addLine('Emergency Venting', `${formatNumber(results.emergencyVentingRequirement)} Nm³/hr`);
  
  yPos += 3;
  
  addSection('Required Capacity & Recommendation');
  addLine('Required Capacity', `${formatNumber(results.requiredCapacity)} Nm³/hr`);
  addLine('Recommended Vent Size', results.recommendedVentSize);
  
  const statusColor =
    results.safetyStatus === 'pass'
      ? [0, 128, 0]
      : results.safetyStatus === 'warning'
        ? [255, 165, 0]
        : [255, 0, 0];
  
  doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
  addLine(
    'Safety Status',
    results.safetyStatus.toUpperCase()
  );
  doc.setTextColor(0, 0, 0);
  
  // Footer
  doc.setFontSize(9);
  doc.setFont('Arial', 'italic');
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    20,
    pageHeight - 10
  );
  
  // Save PDF
  doc.save('api-2000-venting-calculation.pdf');
};

/**
 * Export results to Excel
 */
export const exportToExcel = (
  input: CalculatorInput,
  results: CalculationResults,
  unitSystem: UnitSystem = 'metric'
): void => {
  const workbook = XLSX.utils.book_new();
  
  // Prepare data
  const data = [
    ['API 2000 Venting Calculator Report'],
    [],
    ['Tank Information'],
    ['Tank Type', input.tank.type],
    ['Diameter', unitSystem === 'metric' ? `${input.tank.diameter} m` : `${formatNumber(unitConversions.metersToFeet(input.tank.diameter))} ft`],
    ['Height', unitSystem === 'metric' ? `${input.tank.height} m` : `${formatNumber(unitConversions.metersToFeet(input.tank.height))} ft`],
    ['Design Pressure (mbar)', input.tank.designPressure],
    ['Design Vacuum (mbar)', input.tank.designVacuum],
    [],
    ['Product Information'],
    ['Product Name', input.product.name],
    ['Molecular Weight (g/mol)', input.product.molecularWeight],
    ['Vapor Pressure @ 20°C (bar)', input.product.vaporPressure],
    [],
    ['Operating Conditions'],
    ['Max Filling Rate', unitSystem === 'metric' ? `${input.operating.maxFillingRate} m³/hr` : `${formatNumber(unitConversions.m3ToGallons(input.operating.maxFillingRate))} gal/hr`],
    ['Max Emptying Rate', unitSystem === 'metric' ? `${input.operating.maxEmptyingRate} m³/hr` : `${formatNumber(unitConversions.m3ToGallons(input.operating.maxEmptyingRate))} gal/hr`],
    ['Min Ambient Temp (°C)', input.operating.minAmbientTemp],
    ['Max Ambient Temp (°C)', input.operating.maxAmbientTemp],
    ['Normal Operating Temp (°C)', input.operating.normalOperatingTemp],
    [],
    ['Calculation Results'],
    ['Tank Volume', unitSystem === 'metric' ? `${formatNumber(results.tankVolume)} m³` : `${formatNumber(unitConversions.m3ToGallons(results.tankVolume))} gal`],
    ['Wetted Surface Area (m²)', results.wettedSurfaceArea],
    ['Inbreathing Requirement (Nm³/hr)', results.inbreathingRequirement],
    ['Outbreathing Requirement (Nm³/hr)', results.outbreathingRequirement],
    ['Emergency Venting Requirement (Nm³/hr)', results.emergencyVentingRequirement],
    ['Required Capacity (Nm³/hr)', results.requiredCapacity],
    ['Recommended Vent Size', results.recommendedVentSize],
    ['Safety Status', results.safetyStatus.toUpperCase()],
    [],
    ['Generated on', new Date().toLocaleString()],
  ];
  
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');
  
  // Save Excel
  XLSX.writeFile(workbook, 'api-2000-venting-calculation.xlsx');
};

/**
 * Get safety status color
 */
export const getSafetyStatusColor = (status: 'pass' | 'warning' | 'undersized'): string => {
  switch (status) {
    case 'pass':
      return '#10b981'; // green
    case 'warning':
      return '#f59e0b'; // amber
    case 'undersized':
      return '#ef4444'; // red
  }
};

/**
 * Get safety status message
 */
export const getSafetyStatusMessage = (status: 'pass' | 'warning' | 'undersized'): string => {
  switch (status) {
    case 'pass':
      return '✓ Vent sizing is adequate';
    case 'warning':
      return '⚠ Vent is highly utilized';
    case 'undersized':
      return '✕ Vent is undersized';
  }
};
