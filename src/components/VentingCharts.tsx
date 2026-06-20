import React from 'react';
import { CalculationResults } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface VentingChartsProps {
  results: CalculationResults;
}

export const VentingCharts: React.FC<VentingChartsProps> = ({ results }) => {
  const ventingData = [
    {
      name: 'Inbreathing',
      capacity: results.inbreathingRequirement,
      fill: '#3b82f6',
    },
    {
      name: 'Outbreathing',
      capacity: results.outbreathingRequirement,
      fill: '#ef4444',
    },
    {
      name: 'Emergency',
      capacity: results.emergencyVentingRequirement,
      fill: '#f59e0b',
    },
    {
      name: 'Required',
      capacity: results.requiredCapacity,
      fill: '#10b981',
    },
  ];

  return (
    <div className="charts-container">
      <h3>Venting Capacity Comparison</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ventingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Capacity (Nm³/hr)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Bar dataKey="capacity" name="Capacity (Nm³/hr)">
              {ventingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Utilization breakdown */}
      <div className="utilization-breakdown">
        <h4>Capacity Utilization</h4>
        <div className="utilization-bars">
          {ventingData.slice(0, 3).map((item) => (
            <div key={item.name} className="utilization-item">
              <div className="bar-label">{item.name}</div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(item.capacity / results.requiredCapacity) * 100}%`,
                    backgroundColor: item.fill,
                  }}
                />
              </div>
              <div className="bar-value">{item.capacity.toFixed(1)} Nm³/hr</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
