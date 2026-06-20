import React from 'react';
import { CalculationResults, UnitSystem } from '../types';
import { formatNumber, getSafetyStatusColor, getSafetyStatusMessage } from '../utils';
import { TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ResultsDisplayProps {
  results: CalculationResults;
  unitSystem?: UnitSystem;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, unitSystem: _unitSystem = 'metric' }) => {
  const statusColor = getSafetyStatusColor(results.safetyStatus);
  const statusMessage = getSafetyStatusMessage(results.safetyStatus);
  
  const StatusIcon = 
    results.safetyStatus === 'pass' ? CheckCircle :
    results.safetyStatus === 'warning' ? AlertCircle :
    XCircle;

  return (
    <div className="results-container">
      <h2>Calculation Results</h2>

      {/* Summary Cards */}
      <div className="results-grid">
        <div className="result-card">
          <h4>Tank Volume</h4>
          <p className="result-value">{formatNumber(results.tankVolume)} m³</p>
          <small>Total capacity</small>
        </div>

        <div className="result-card">
          <h4>Wetted Surface Area</h4>
          <p className="result-value">{formatNumber(results.wettedSurfaceArea)} m²</p>
          <small>Fire exposure area</small>
        </div>
      </div>

      {/* Venting Requirements */}
      <div className="requirements-section">
        <h3>Venting Requirements</h3>
        <table className="requirements-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Capacity (Nm³/hr)</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inbreathing</td>
              <td>{formatNumber(results.inbreathingRequirement)}</td>
              <td>{formatNumber((results.inbreathingRequirement / results.requiredCapacity) * 100)}%</td>
            </tr>
            <tr>
              <td>Outbreathing</td>
              <td>{formatNumber(results.outbreathingRequirement)}</td>
              <td>{formatNumber((results.outbreathingRequirement / results.requiredCapacity) * 100)}%</td>
            </tr>
            <tr>
              <td>Emergency Venting</td>
              <td>{formatNumber(results.emergencyVentingRequirement)}</td>
              <td>{formatNumber((results.emergencyVentingRequirement / results.requiredCapacity) * 100)}%</td>
            </tr>
            <tr className="total-row">
              <td><strong>Required Capacity</strong></td>
              <td><strong>{formatNumber(results.requiredCapacity)}</strong></td>
              <td><strong>100%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Recommendation */}
      <div className="recommendation-section">
        <div className="vent-size-card">
          <TrendingUp size={24} />
          <div>
            <h4>Recommended Vent Size</h4>
            <p className="vent-size-value">{results.recommendedVentSize}</p>
            <small>Minimum size for required capacity</small>
          </div>
        </div>

        {/* Safety Status */}
        <div
          className="safety-status-card"
          style={{ borderLeftColor: statusColor }}
        >
          <StatusIcon size={32} style={{ color: statusColor }} />
          <div>
            <h4>Safety Status</h4>
            <p style={{ color: statusColor, fontWeight: 'bold' }}>
              {results.safetyStatus.toUpperCase()}
            </p>
            <small>{statusMessage}</small>
          </div>
        </div>
      </div>

      {/* Details Table */}
      <div className="details-section">
        <h3>Detailed Summary</h3>
        <table className="details-table">
          <tbody>
            <tr>
              <td>Tank Volume</td>
              <td>{formatNumber(results.tankVolume)} m³</td>
            </tr>
            <tr>
              <td>Wetted Surface Area</td>
              <td>{formatNumber(results.wettedSurfaceArea)} m²</td>
            </tr>
            <tr>
              <td>Inbreathing Requirement</td>
              <td>{formatNumber(results.inbreathingRequirement)} Nm³/hr</td>
            </tr>
            <tr>
              <td>Outbreathing Requirement</td>
              <td>{formatNumber(results.outbreathingRequirement)} Nm³/hr</td>
            </tr>
            <tr>
              <td>Emergency Venting Requirement</td>
              <td>{formatNumber(results.emergencyVentingRequirement)} Nm³/hr</td>
            </tr>
            <tr className="total-row">
              <td>Required Capacity</td>
              <td>{formatNumber(results.requiredCapacity)} Nm³/hr</td>
            </tr>
            <tr>
              <td>Recommended Vent Size</td>
              <td>{results.recommendedVentSize}</td>
            </tr>
            <tr>
              <td>Safety Status</td>
              <td style={{ color: statusColor, fontWeight: 'bold' }}>
                {results.safetyStatus.toUpperCase()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
