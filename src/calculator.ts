import { CalculatorInput, CalculationResults, STANDARD_VENT_SIZES } from './types';

/**
 * API 2000 Venting Calculator
 * Implements API Standard 2000 methodology for tank venting calculations
 */

export class VentingCalculator {
  /**
   * Calculate tank volume
   * Volume = π × (Diameter² / 4) × Height
   */
  private calculateTankVolume(diameterM: number, heightM: number): number {
    return Math.PI * Math.pow(diameterM / 2, 2) * heightM;
  }

  /**
   * Calculate wetted surface area for fire exposure
   * Based on API 2000 methodology
   */
  private calculateWettedSurfaceArea(
    diameterM: number,
    wettedHeightM: number
  ): number {
    // Wetted surface area = π × Diameter × Wetted Height (cylindrical section)
    return Math.PI * diameterM * wettedHeightM;
  }

  /**
   * Calculate inbreathing requirement
   * Inbreathing = Liquid withdrawal + Thermal contraction
   */
  private calculateInbreathingRequirement(input: CalculatorInput): number {
    const { operating, tank } = input;
    
    // 1. Withdrawal rate component
    // Using max emptying rate
    const withdrawalComponent = operating.maxEmptyingRate;
    
    // 2. Thermal contraction component
    // Using coefficient of thermal expansion and temperature range
    const tempRange = operating.maxAmbientTemp - operating.minAmbientTemp;
    const tankVolume = this.calculateTankVolume(tank.diameter, tank.height);
    
    // Approximate volumetric thermal contraction (0.1% per 50°C for liquids)
    const thermalContractionFactor = 0.001 * (tempRange / 50);
    const thermalContraction = (tankVolume * thermalContractionFactor) / 24; // m³/hr
    
    // Convert to Nm³/hr (using ideal gas law correction)
    // Assume 20°C reference, molecular weight dependency
    const tempFactor = (273.15 + 20) / (273.15 + operating.normalOperatingTemp);
    const thermalContractionNm3 = thermalContraction * tempFactor;
    
    // Total inbreathing
    return withdrawalComponent + thermalContractionNm3;
  }

  /**
   * Calculate outbreathing requirement
   * Outbreathing = Liquid filling + Thermal expansion
   */
  private calculateOutbreathingRequirement(input: CalculatorInput): number {
    const { operating, tank } = input;
    
    // 1. Filling rate component
    const fillingComponent = operating.maxFillingRate;
    
    // 2. Thermal expansion component
    const tempRange = operating.maxAmbientTemp - operating.minAmbientTemp;
    const tankVolume = this.calculateTankVolume(tank.diameter, tank.height);
    
    // Approximate volumetric thermal expansion (0.1% per 50°C for liquids)
    const thermalExpansionFactor = 0.001 * (tempRange / 50);
    const thermalExpansion = (tankVolume * thermalExpansionFactor) / 24; // m³/hr
    
    // Convert to Nm³/hr
    const tempFactor = (273.15 + 20) / (273.15 + operating.normalOperatingTemp);
    const thermalExpansionNm3 = thermalExpansion * tempFactor;
    
    // Total outbreathing
    return fillingComponent + thermalExpansionNm3;
  }

  /**
   * Calculate emergency venting requirement (fire exposure)
   * Based on API 2000 fire exposure model
   */
  private calculateEmergencyVentingRequirement(input: CalculatorInput): number {
    const { emergency, tank } = input;
    
    if (!emergency.fireExposure) {
      return 0;
    }
    
    // API 2000 fire exposure formula
    // Q = 1222 × L^0.82 / (T × M)^0.5
    // Q: venting capacity in m³/min
    // L: wetted surface area in m²
    // T: absolute temperature in K
    // M: molecular weight
    
    const wettedArea = this.calculateWettedSurfaceArea(
      tank.diameter,
      emergency.wettedSurfaceHeight
    );
    
    const tempK = 273.15 + 20; // Standard reference temperature
    const molecularWeight = input.product.molecularWeight;
    
    // API 2000 formula constants (metric units)
    // Using simplified version: Q (m³/min) = 1222 × L^0.82 / sqrt(T × M)
    const ventingCapacityM3Min =
      (1222 * Math.pow(wettedArea, 0.82)) / Math.sqrt(tempK * molecularWeight);
    
    // Convert m³/min to Nm³/hr
    // 1 m³/min = 60 m³/hr
    // For normal conditions (20°C, 1 bar): m³/hr ≈ Nm³/hr
    const ventingCapacityNm3Hr = ventingCapacityM3Min * 60 * 1.05; // 5% safety factor
    
    return ventingCapacityNm3Hr;
  }

  /**
   * Find recommended vent size
   */
  private findRecommendedVentSize(requiredCapacity: number): string {
    // Add 20% safety margin
    const requiredWithMargin = requiredCapacity * 1.2;
    
    for (const vent of STANDARD_VENT_SIZES) {
      if (vent.flow >= requiredWithMargin) {
        return `${vent.size}"`;
      }
    }
    
    // If required capacity exceeds all standard sizes
    return 'Custom (> 8")';
  }

  /**
   * Assess safety status
   */
  private assessSafetyStatus(
    requiredCapacity: number,
    ventSize: string
  ): 'pass' | 'warning' | 'undersized' {
    // Find the actual vent size flow capacity
    let actualFlow = 0;
    
    if (ventSize === 'Custom (> 8")') {
      return 'undersized';
    }
    
    const sizeMatch = ventSize.match(/(\d+)/);
    if (sizeMatch) {
      const sizeNum = parseInt(sizeMatch[1]);
      const ventData = STANDARD_VENT_SIZES.find(v => v.size === sizeNum);
      if (ventData) {
        actualFlow = ventData.flow;
      }
    }
    
    const utilizationPercent = (requiredCapacity / actualFlow) * 100;
    
    if (utilizationPercent > 90) {
      return 'undersized';
    } else if (utilizationPercent > 75) {
      return 'warning';
    } else {
      return 'pass';
    }
  }

  /**
   * Main calculation method
   */
  calculate(input: CalculatorInput): CalculationResults {
    const tankVolume = this.calculateTankVolume(
      input.tank.diameter,
      input.tank.height
    );
    
    const wettedSurfaceArea = this.calculateWettedSurfaceArea(
      input.tank.diameter,
      input.emergency.wettedSurfaceHeight
    );
    
    const inbreathingRequirement = this.calculateInbreathingRequirement(input);
    const outbreathingRequirement = this.calculateOutbreathingRequirement(input);
    const emergencyVentingRequirement =
      this.calculateEmergencyVentingRequirement(input);
    
    const requiredCapacity = Math.max(
      inbreathingRequirement,
      outbreathingRequirement,
      emergencyVentingRequirement
    );
    
    const recommendedVentSize = this.findRecommendedVentSize(requiredCapacity);
    const safetyStatus = this.assessSafetyStatus(requiredCapacity, recommendedVentSize);
    
    return {
      tankVolume: Math.round(tankVolume * 100) / 100,
      wettedSurfaceArea: Math.round(wettedSurfaceArea * 100) / 100,
      inbreathingRequirement: Math.round(inbreathingRequirement * 10) / 10,
      outbreathingRequirement: Math.round(outbreathingRequirement * 10) / 10,
      emergencyVentingRequirement: Math.round(emergencyVentingRequirement * 10) / 10,
      requiredCapacity: Math.round(requiredCapacity * 10) / 10,
      recommendedVentSize,
      safetyStatus,
    };
  }
}

// Export singleton instance
export const ventingCalculator = new VentingCalculator();
