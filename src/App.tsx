import React, { useState, useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { TankInput } from './components/TankInput';
import { ProductInput } from './components/ProductInput';
import { OperatingConditionsInput } from './components/OperatingConditionsInput';
import { EmergencyConditionsInput } from './components/EmergencyConditionsInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { VentingCharts } from './components/VentingCharts';
import { TankVisualization } from './components/TankVisualization';
import { ExportPanel } from './components/ExportPanel';
import { ventingCalculator } from './calculator';
import { TankData, ProductData, OperatingConditions, EmergencyConditions, CalculationResults, UnitSystem, PRESET_PRODUCTS } from './types';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  
  const [tankData, setTankData] = useState<TankData>({
    diameter: 10,
    height: 12,
    type: 'fixed-roof',
    designPressure: 500,
    designVacuum: 500,
  });

  const [productData, setProductData] = useState<ProductData>(
    PRESET_PRODUCTS['crude-oil']
  );

  const [operatingConditions, setOperatingConditions] = useState<OperatingConditions>({
    maxFillingRate: 50,
    maxEmptyingRate: 50,
    maxAmbientTemp: 45,
    minAmbientTemp: -5,
    normalOperatingTemp: 20,
  });

  const [emergencyConditions, setEmergencyConditions] = useState<EmergencyConditions>({
    fireExposure: true,
    wettedSurfaceHeight: 8,
  });

  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleCalculate = useCallback(() => {
    try {
      const calculationResults = ventingCalculator.calculate({
        tank: tankData,
        product: productData,
        operating: operatingConditions,
        emergency: emergencyConditions,
      });
      setResults(calculationResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  }, [tankData, productData, operatingConditions, emergencyConditions]);

  // Auto-calculate when inputs change
  React.useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div>
          <h1>API 2000 Venting Calculator</h1>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
            Professional atmospheric storage tank venting calculator
          </p>
        </div>
        <div className="header-controls">
          <div className="unit-toggle">
            <button
              className={unitSystem === 'metric' ? 'active' : ''}
              onClick={() => setUnitSystem('metric')}
            >
              Metric
            </button>
            <button
              className={unitSystem === 'imperial' ? 'active' : ''}
              onClick={() => setUnitSystem('imperial')}
            >
              Imperial
            </button>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle dark/light mode"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="main-content">
          {/* Input Panel */}
          <div className="input-panel">
            <TankInput tankData={tankData} onTankDataChange={setTankData} />
            <ProductInput productData={productData} onProductDataChange={setProductData} />
            <OperatingConditionsInput
              conditions={operatingConditions}
              onConditionsChange={setOperatingConditions}
            />
            <EmergencyConditionsInput
              conditions={emergencyConditions}
              onConditionsChange={setEmergencyConditions}
            />
          </div>

          {/* Results Panel */}
          <div className="results-panel">
            {results && (
              <>
                <ResultsDisplay results={results} unitSystem={unitSystem} />
                <TankVisualization
                  tankData={tankData}
                  unitSystem={unitSystem}
                />
                <VentingCharts results={results} />
                <ExportPanel
                  input={{
                    tank: tankData,
                    product: productData,
                    operating: operatingConditions,
                    emergency: emergencyConditions,
                  }}
                  results={results}
                  unitSystem={unitSystem}
                />
              </>
            )}
            {!results && (
              <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                <p>Loading calculations...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
