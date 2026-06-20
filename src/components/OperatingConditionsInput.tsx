import React from 'react';
import { OperatingConditions } from '../types';

interface OperatingConditionsInputProps {
  conditions: OperatingConditions;
  onConditionsChange: (conditions: OperatingConditions) => void;
}

export const OperatingConditionsInput: React.FC<OperatingConditionsInputProps> = ({
  conditions,
  onConditionsChange,
}) => {
  const handleChange = (field: keyof OperatingConditions, value: any) => {
    onConditionsChange({
      ...conditions,
      [field]: value,
    });
  };

  return (
    <div className="input-section">
      <h3>Operating Conditions</h3>

      <div className="form-group">
        <label>Maximum Filling Rate (m³/hr)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={conditions.maxFillingRate}
          onChange={(e) => handleChange('maxFillingRate', parseFloat(e.target.value))}
          placeholder="e.g., 100"
        />
      </div>

      <div className="form-group">
        <label>Maximum Emptying Rate (m³/hr)</label>
        <input
          type="number"
          min="0"
          step="0.1"
          value={conditions.maxEmptyingRate}
          onChange={(e) => handleChange('maxEmptyingRate', parseFloat(e.target.value))}
          placeholder="e.g., 80"
        />
      </div>

      <div className="form-group">
        <label>Minimum Ambient Temperature (°C)</label>
        <input
          type="number"
          step="0.1"
          value={conditions.minAmbientTemp}
          onChange={(e) => handleChange('minAmbientTemp', parseFloat(e.target.value))}
          placeholder="e.g., -10"
        />
      </div>

      <div className="form-group">
        <label>Maximum Ambient Temperature (°C)</label>
        <input
          type="number"
          step="0.1"
          value={conditions.maxAmbientTemp}
          onChange={(e) => handleChange('maxAmbientTemp', parseFloat(e.target.value))}
          placeholder="e.g., 50"
        />
      </div>

      <div className="form-group">
        <label>Normal Operating Temperature (°C)</label>
        <input
          type="number"
          step="0.1"
          value={conditions.normalOperatingTemp}
          onChange={(e) => handleChange('normalOperatingTemp', parseFloat(e.target.value))}
          placeholder="e.g., 20"
        />
      </div>
    </div>
  );
};
