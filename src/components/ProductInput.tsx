import React from 'react';
import { ProductData, ProductType, PRESET_PRODUCTS } from '../types';

interface ProductInputProps {
  productData: ProductData;
  onProductDataChange: (data: ProductData) => void;
}

const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'crude-oil', label: 'Crude Oil' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'ethanol', label: 'Ethanol' },
  { value: 'water', label: 'Water' },
  { value: 'custom', label: 'Custom' },
];

export const ProductInput: React.FC<ProductInputProps> = ({
  productData,
  onProductDataChange,
}) => {
  const handleTypeChange = (type: ProductType) => {
    if (type === 'custom') {
      onProductDataChange({
        ...productData,
        type: 'custom',
      });
    } else {
      const preset = PRESET_PRODUCTS[type];
      onProductDataChange(preset);
    }
  };

  const handleCustomChange = (field: 'name' | 'molecularWeight' | 'vaporPressure', value: any) => {
    onProductDataChange({
      ...productData,
      [field]: value,
    });
  };

  return (
    <div className="input-section">
      <h3>Product Data</h3>

      <div className="form-group">
        <label>Product Type</label>
        <select
          value={productData.type}
          onChange={(e) => handleTypeChange(e.target.value as ProductType)}
        >
          {PRODUCT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          value={productData.name}
          onChange={(e) => handleCustomChange('name', e.target.value)}
          placeholder="e.g., Crude Oil"
          disabled={productData.type !== 'custom'}
        />
      </div>

      <div className="form-group">
        <label>Molecular Weight (g/mol)</label>
        <input
          type="number"
          min="1"
          step="0.1"
          value={productData.molecularWeight}
          onChange={(e) => handleCustomChange('molecularWeight', parseFloat(e.target.value))}
          placeholder="e.g., 250"
          disabled={productData.type !== 'custom'}
        />
      </div>

      <div className="form-group">
        <label>Vapor Pressure @ 20°C (bar)</label>
        <input
          type="number"
          min="0"
          step="0.001"
          value={productData.vaporPressure}
          onChange={(e) => handleCustomChange('vaporPressure', parseFloat(e.target.value))}
          placeholder="e.g., 0.02"
          disabled={productData.type !== 'custom'}
        />
      </div>
    </div>
  );
};
