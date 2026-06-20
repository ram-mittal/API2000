// Tank types
export type TankType = 'fixed-roof' | 'cone-roof' | 'floating-roof';

// Product types
export type ProductType = 'crude-oil' | 'diesel' | 'gasoline' | 'ethanol' | 'water' | 'custom';

// Unit systems
export type UnitSystem = 'metric' | 'imperial';

// Calculation results
export interface CalculationResults {
  tankVolume: number; // m³
  wettedSurfaceArea: number; // m²
  inbreathingRequirement: number; // Nm³/hr
  outbreathingRequirement: number; // Nm³/hr
  emergencyVentingRequirement: number; // Nm³/hr
  requiredCapacity: number; // Nm³/hr
  recommendedVentSize: string;
  safetyStatus: 'pass' | 'warning' | 'undersized';
}

// Tank data input
export interface TankData {
  diameter: number; // m
  height: number; // m
  type: TankType;
  designPressure: number; // mbar
  designVacuum: number; // mbar
}

// Product data
export interface ProductData {
  name: string;
  type: ProductType;
  molecularWeight: number; // g/mol
  vaporPressure: number; // bar (@ 20°C)
}

// Operating conditions
export interface OperatingConditions {
  maxFillingRate: number; // m³/hr
  maxEmptyingRate: number; // m³/hr
  maxAmbientTemp: number; // °C
  minAmbientTemp: number; // °C
  normalOperatingTemp: number; // °C
}

// Emergency conditions
export interface EmergencyConditions {
  fireExposure: boolean;
  wettedSurfaceHeight: number; // m
}

// Complete calculator input
export interface CalculatorInput {
  tank: TankData;
  product: ProductData;
  operating: OperatingConditions;
  emergency: EmergencyConditions;
}

// Preset products
export const PRESET_PRODUCTS: Record<Exclude<ProductType, 'custom'>, ProductData> = {
  'crude-oil': {
    name: 'Crude Oil',
    type: 'crude-oil',
    molecularWeight: 250,
    vaporPressure: 0.02,
  },
  'diesel': {
    name: 'Diesel',
    type: 'diesel',
    molecularWeight: 280,
    vaporPressure: 0.01,
  },
  'gasoline': {
    name: 'Gasoline',
    type: 'gasoline',
    molecularWeight: 100,
    vaporPressure: 0.5,
  },
  'ethanol': {
    name: 'Ethanol',
    type: 'ethanol',
    molecularWeight: 46,
    vaporPressure: 0.2,
  },
  'water': {
    name: 'Water',
    type: 'water',
    molecularWeight: 18,
    vaporPressure: 0.02,
  },
};

// Standard vent sizes
export const STANDARD_VENT_SIZES = [
  { size: 2, diameter: 50.8, flow: 590 }, // 2 inch, flow in Nm³/hr
  { size: 3, diameter: 76.2, flow: 1290 },
  { size: 4, diameter: 101.6, flow: 2125 },
  { size: 6, diameter: 152.4, flow: 4700 },
  { size: 8, diameter: 203.2, flow: 8350 },
];

// Theme
export type Theme = 'light' | 'dark';
