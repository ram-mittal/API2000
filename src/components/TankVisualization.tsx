import React from 'react';
import { TankData, UnitSystem } from '../types';
import { unitConversions, formatNumber } from '../utils';

interface TankVisualizationProps {
  tankData: TankData;
  unitSystem: UnitSystem;
}

export const TankVisualization: React.FC<TankVisualizationProps> = ({
  tankData,
  unitSystem,
}) => {
  const scale = 200; // Scale for SVG (pixels)
  const diameterDisplay = unitSystem === 'metric' 
    ? tankData.diameter 
    : unitConversions.metersToFeet(tankData.diameter);
  const heightDisplay = unitSystem === 'metric'
    ? tankData.height
    : unitConversions.metersToFeet(tankData.height);

  const maxDimension = Math.max(diameterDisplay, heightDisplay);
  const tankRadius = (diameterDisplay / maxDimension) * (scale / 2);
  const tankHeight = (heightDisplay / maxDimension) * scale;

  const svgWidth = tankRadius * 2 + 40;
  const svgHeight = tankHeight + 80;

  const roofPath = () => {
    switch (tankData.type) {
      case 'cone-roof':
        return `M ${20 + tankRadius - tankRadius} ${30} L ${20 + tankRadius + tankRadius} ${30} L ${20 + tankRadius} ${30 - tankRadius * 0.5} Z`;
      case 'floating-roof':
        return `M ${20 + tankRadius - tankRadius} ${30} L ${20 + tankRadius + tankRadius} ${30}`;
      case 'fixed-roof':
      default:
        return `M ${20 + tankRadius - tankRadius} ${30} L ${20 + tankRadius + tankRadius} ${30}`;
    }
  };

  return (
    <div className="visualization-section">
      <h3>Tank Visualization</h3>
      <div className="tank-viz-container">
        <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          {/* Tank body */}
          <ellipse
            cx={20 + tankRadius}
            cy={30}
            rx={tankRadius}
            ry={tankRadius * 0.2}
            fill="none"
            stroke="#64748b"
            strokeWidth="1"
            opacity="0.3"
          />

          {/* Tank sides */}
          <line
            x1={20 + tankRadius - tankRadius}
            y1={30}
            x2={20 + tankRadius - tankRadius}
            y2={30 + tankHeight}
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <line
            x1={20 + tankRadius + tankRadius}
            y1={30}
            x2={20 + tankRadius + tankRadius}
            y2={30 + tankHeight}
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Tank bottom */}
          <ellipse
            cx={20 + tankRadius}
            cy={30 + tankHeight}
            rx={tankRadius}
            ry={tankRadius * 0.2}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Tank roof */}
          <path
            d={roofPath()}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Dimension arrows and labels */}
          {/* Diameter dimension */}
          <line
            x1={20}
            y1={30 + tankHeight + 20}
            x2={20 + tankRadius * 2}
            y2={30 + tankHeight + 20}
            stroke="#64748b"
            strokeWidth="1"
          />
          <text
            x={20 + tankRadius}
            y={30 + tankHeight + 40}
            textAnchor="middle"
            fontSize="12"
            fill="#475569"
          >
            ∅ {formatNumber(diameterDisplay)} {unitSystem === 'metric' ? 'm' : 'ft'}
          </text>

          {/* Height dimension */}
          <line
            x1={20 + tankRadius * 2 + 15}
            y1={30}
            x2={20 + tankRadius * 2 + 15}
            y2={30 + tankHeight}
            stroke="#64748b"
            strokeWidth="1"
          />
          <text
            x={20 + tankRadius * 2 + 35}
            y={30 + tankHeight / 2}
            fontSize="12"
            fill="#475569"
          >
            H = {formatNumber(heightDisplay)} {unitSystem === 'metric' ? 'm' : 'ft'}
          </text>

          {/* Tank type label */}
          <text
            x={20 + tankRadius}
            y={10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#1e293b"
          >
            {tankData.type === 'fixed-roof' ? 'Fixed Roof' : tankData.type === 'cone-roof' ? 'Cone Roof' : 'Floating Roof'} Tank
          </text>
        </svg>
      </div>

      {/* Tank specifications */}
      <div className="tank-specs">
        <table className="specs-table">
          <tbody>
            <tr>
              <td>Tank Type</td>
              <td>{tankData.type === 'fixed-roof' ? 'Fixed Roof' : tankData.type === 'cone-roof' ? 'Cone Roof' : 'Floating Roof'}</td>
            </tr>
            <tr>
              <td>Diameter</td>
              <td>
                {formatNumber(diameterDisplay)} {unitSystem === 'metric' ? 'm' : 'ft'}
              </td>
            </tr>
            <tr>
              <td>Height</td>
              <td>
                {formatNumber(heightDisplay)} {unitSystem === 'metric' ? 'm' : 'ft'}
              </td>
            </tr>
            <tr>
              <td>Design Pressure</td>
              <td>{formatNumber(tankData.designPressure)} mbar</td>
            </tr>
            <tr>
              <td>Design Vacuum</td>
              <td>{formatNumber(tankData.designVacuum)} mbar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
