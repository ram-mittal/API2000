import React from 'react';
import { EmergencyConditions } from '../types';

interface EmergencyConditionsInputProps {
  conditions: EmergencyConditions;
  onConditionsChange: (conditions: EmergencyConditions) => void;
}

export const EmergencyConditionsInput: React.FC<EmergencyConditionsInputProps> = ({
  conditions,
  onConditionsChange,
}) => {
  const handleChange = (field: keyof EmergencyConditions, value: any) => {
    onConditionsChange({
      ...conditions,
      [field]: value,
    });
  };

  return (
    <div className="input-section">
      <h3>Emergency Conditions</h3>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={conditions.fireExposure}
            onChange={(e) => handleChange('fireExposure', e.target.checked)}
          />
          Fire Exposure Scenario
        </label>
      </div>

      {conditions.fireExposure && (
        <div className="form-group">
          <label>Wetted Surface Height (m)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={conditions.wettedSurfaceHeight}
            onChange={(e) => handleChange('wettedSurfaceHeight', parseFloat(e.target.value))}
            placeholder="e.g., 8.0"
          />
          <small>Height of tank surface exposed to fire</small>
        </div>
      )}
    </div>
  );
};
