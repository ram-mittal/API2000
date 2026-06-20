# API 2000 Venting Calculator

A professional web application for calculating atmospheric storage tank venting requirements according to **API Standard 2000**.

## Overview

The API 2000 Venting Calculator is a modern, responsive engineering tool designed to help calculate required venting capacity for atmospheric storage tanks under various operating and emergency conditions. The application implements the methodologies specified in API Standard 2000 for pressure and vacuum relief venting.

## Features

### Core Functionality
- **Tank Venting Calculations**
  - Inbreathing requirements (liquid withdrawal + thermal contraction)
  - Outbreathing requirements (liquid filling + thermal expansion)
  - Emergency venting requirements (fire exposure)
  - Required vent capacity determination

- **Tank Support**
  - Fixed Roof tanks
  - Cone Roof tanks
  - Floating Roof tanks

- **Product Support**
  - Preset products: Crude Oil, Diesel, Gasoline, Ethanol, Water
  - Custom product properties
  - Molecular weight and vapor pressure inputs

### User Interface
- **Modern Dashboard Design**
  - Professional engineering interface
  - Intuitive input forms
  - Real-time calculation
  - Tabbed interface (Input Data / Results)

- **Theme Support**
  - Dark mode / Light mode toggle
  - Persistent theme preference
  - System preference detection

- **Unit System Support**
  - Metric (meters, m³, °C)
  - Imperial (feet, gallons, °F)
  - On-the-fly unit conversion

### Results & Visualization
- **Comprehensive Results Display**
  - Tank summary information
  - Venting requirement breakdown
  - Safety status assessment
  - Recommended vent sizing

- **Interactive Visualizations**
  - Tank schematic diagram
  - Venting capacity comparison chart
  - Distribution pie chart
  - Standard vent size compatibility table

- **Report Export**
  - Export to PDF with professional formatting
  - Export to Excel spreadsheet
  - Calculation timestamp and tank identifier
  - Complete calculation summary

## Technical Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Build tool and development server
- **Recharts** - Data visualization
- **jsPDF** - PDF generation
- **XLSX** - Excel export
- **Lucide React** - Icon library

### Build & Development
- **npm** - Package management
- **TypeScript Compiler** - Type checking
- **ESLint** - Code quality

## Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

1. **Clone or extract the project**
   ```bash
   cd api-2000-venting-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will open at `http://localhost:5173`

## Usage

### Step 1: Enter Tank Data
- Specify tank diameter and height
- Select tank type (fixed, cone, or floating roof)
- Enter design pressure and vacuum ratings

### Step 2: Specify Product Properties
- Select a preset product or enter custom properties
- Provide molecular weight and vapor pressure
- (Optional) Enter product name for identification

### Step 3: Define Operating Conditions
- Maximum filling and emptying rates
- Ambient temperature range
- Normal operating temperature

### Step 4: Configure Emergency Scenarios
- Enable/disable fire exposure consideration
- Specify wetted surface height for fire case

### Step 5: Calculate
- Click "Calculate Venting Requirement"
- View results in the Results tab

### Step 6: Export Results
- Export calculation report to PDF
- Export data table to Excel
- Save for future reference

## Calculation Methodology

The calculator implements the following API 2000 calculation methods:

### Tank Volume
```
Volume = π × (Diameter² / 4) × Height
```

### Wetted Surface Area
```
Area = π × Diameter × WettedHeight + RoofArea
```
(Adjusted for tank type: floating roof omits roof area)

### Inbreathing Requirement
```
Inbreathing = MAX(WithdrawalRate, ThermalContraction) + NormalBreathing
```
- Withdrawal rate with 10% safety margin
- Thermal contraction coefficient: 0.0008/°C
- Normal breathing: 0.25% of tank volume per day
- Floating roof: ×1.2 multiplier

### Outbreathing Requirement
```
Outbreathing = MAX(FillingRate, ThermalExpansion) + NormalBreathing
```
- Filling rate with 15% safety factor
- Thermal expansion coefficient: 0.0008/°C
- Normal breathing: 0.25% of tank volume per day
- Floating roof: ×0.8 multiplier

### Emergency Venting (Fire Exposure)
```
Q1 = 1360 × A^0.82 (m³/min)
```
- A = wetted surface area in m²
- Converted to Nm³/hr for final result
- Based on hydrocarbon fire exposure model

### Required Capacity
```
Required = MAX(Inbreathing, Outbreathing, EmergencyVenting)
```

### Vent Sizing
Standard vent sizes and their capacities:
| Size | Capacity (Nm³/hr) |
|------|-------------------|
| 2-inch | 280 |
| 3-inch | 630 |
| 4-inch | 1,120 |
| 6-inch | 2,520 |
| 8-inch | 4,480 |

### Safety Assessment
- **Pass**: ≥15% safety margin above requirement
- **Warning**: 0-15% margin above requirement
- **Undersized**: <0% margin (fails requirement)

## File Structure

```
api-2000-venting-calculator/
├── src/
│   ├── components/
│   │   ├── InputForms.tsx          # Input form components
│   │   ├── ResultsDisplay.tsx      # Results visualization
│   │   └── TankVisualization.tsx   # Tank diagram
│   ├── App.tsx                     # Main application component
│   ├── ThemeContext.tsx            # Theme provider
│   ├── calculator.ts               # Calculation engine
│   ├── types.ts                    # TypeScript interfaces
│   ├── utils.ts                    # Utility functions
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies
├── .eslintrc.cjs                   # ESLint configuration
└── README.md                       # This file
```

## Development

### Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint code quality checks
- **`npm run type-check`** - Check TypeScript types

### Code Organization

- **Types** (`types.ts`) - All TypeScript interfaces and types
- **Calculator** (`calculator.ts`) - Core calculation engine with VentingCalculator class
- **Utils** (`utils.ts`) - Unit conversion and export functions
- **Components** - React components for UI sections
- **Styling** (`index.css`) - Global styles with dark mode support

## Important Notes

### Limitations & Disclaimers

1. **Regulatory Compliance**: This calculator provides estimates based on API Standard 2000. Always verify results with qualified engineers and compare with site-specific conditions.

2. **Simplified Model**: The calculation engine uses simplified models for rapid estimation. Complex scenarios may require detailed engineering analysis.

3. **Product Properties**: Enter accurate product properties for meaningful results. Vapor pressure should be at operating temperature.

4. **Safety Margins**: The recommended safety margins (15% minimum) are guidance only. Consult API standards and local regulations for specific requirements.

5. **Fire Exposure**: Emergency venting calculations assume uniform fire exposure. Real scenarios may vary significantly.

6. **Professional Review**: All calculations should be reviewed by qualified engineers before implementation.

### Unit Conversion Notes

- Temperature conversions use standard formulas
- Flow rates and volumes converted using standard factors
- Pressure conversions between mbar and psi
- All internal calculations performed in SI units (metric)

## Performance Optimizations

- Lazy calculation with simulated delay for better UX
- Efficient re-render management with React state
- Chart optimization with Recharts
- CSS transitions for smooth theme switching

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Accessibility

- Semantic HTML structure
- ARIA labels on form elements
- Keyboard navigation support
- High contrast in both light and dark modes
- Readable font sizes and spacing

## Future Enhancements

- [ ] Multi-tank project support
- [ ] Calculation history tracking
- [ ] Advanced fire scenario modeling
- [ ] Integration with tank design standards
- [ ] Real-time weather data integration
- [ ] Mobile app version
- [ ] Cloud-based calculation storage

## License

This project is provided as-is for engineering and educational use.

## Support & Contact

For issues, feature requests, or questions:
- Review API Standard 2000 documentation
- Consult with qualified engineers for critical applications
- Verify all calculations before implementation

## References

- **API Standard 2000** - Venting Atmospheric and Low-Pressure Storage Tanks: Nonrefrigerated and Refrigerated
- **API RP 620** - Design and Construction of Large, Welded, Low-Pressure Carbon Steel Storage Tanks
- **NFPA 30** - Flammable and Combustible Liquids Code

---

**Version**: 1.0.0  
**Last Updated**: June 2024  
**Built with**: React, TypeScript, Vite
