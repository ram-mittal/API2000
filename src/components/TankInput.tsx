import React from 'react';
import { TankData, TankType } from '../types';

interface TankInputProps {
  tankData: TankData;
  onTankDataChange: (data: TankData) => void;
}

const TANK_TYPES: { value: TankType; label: string }[] = [
  { value: 'fixed-roof', label: 'Fixed Roof' },
  { value: 'cone-roof', label: 'Cone Roof' },
  { value: 'floating-roof', label: 'Floating Roof' },
];

export const TankInput: React.FC<TankInputProps> = ({ tankData, onTankDataChange }) => {
  const handleChange = (field: keyof TankData, value: any) => {
    onTankDataChange({
      ...tankData,
      [field]: value,
    });
  };

  return (
    <div className="input-section">
      <h3>Tank Data</h3>
      
      <div className="form-group">
        <label>Tank Diameter (m)</label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={tankData.diameter}
          onChange={(e) => handleChange('diameter', parseFloat(e.target.value))}
          placeholder="e.g., 10.5"
        />
      </div>

      <div className="form-group">
        <label>Tank Height (m)</label>
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={tankData.height}
          onChange={(e) => handleChange('height', parseFloat(e.target.value))}
          placeholder="e.g., 12.0"
        />
      </div>

      <div className="form-group">
        <label>Tank Type</label>
        <select
          value={tankData.type}
          onChange={(e) => handleChange('type', e.target.value as TankType)}
        >
          {TANK_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Design Pressure (mbar)</label>
        <input
          type="number"
          min="0"
          step="1"
          value={tankData.designPressure}
          onChange={(e) => handleChange('designPressure', parseFloat(e.target.value))}
          placeholder="e.g., 100"
        />
      </div>

      <div className="form-group">
        <label>Design Vacuum (mbar)</label>
        <input
          type="number"
          min="0"
          step="1"
          value={tankData.designVacuum}
          onChange={(e) => handleChange('designVacuum', parseFloat(e.target.value))}
          placeholder="e.g., 500"
        />
      </div>
    </div>
  );
};
