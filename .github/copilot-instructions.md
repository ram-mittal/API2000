# API 2000 Venting Calculator - Project Setup

## Project Overview
Professional web application for calculating atmospheric storage tank venting requirements according to API Standard 2000. Built with React, TypeScript, and Vite with advanced calculations, data visualization, and export capabilities.

## Technology Stack
- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Visualization**: Recharts
- **Export**: jsPDF, XLSX
- **Icons**: Lucide React
- **Styling**: CSS with CSS variables for theming

## Project Structure
```
src/
├── components/           # React UI components
├── App.tsx              # Main application component
├── calculator.ts        # API 2000 calculation engine
├── types.ts             # TypeScript interfaces
├── utils.ts             # Utilities (unit conversion, export)
├── ThemeContext.tsx     # Theme management
├── main.tsx             # React entry point
└── index.css            # Global styles
```

## Key Features Implemented
1. **Tank Data Input** - Diameter, height, type, pressure ratings
2. **Product Properties** - Preset products + custom options
3. **Operating Conditions** - Flow rates, temperature ranges
4. **Emergency Scenarios** - Fire exposure venting calculations
5. **Calculations** - Inbreathing, outbreathing, emergency venting
6. **Results Display** - Charts, tables, visualizations
7. **Tank Visualization** - SVG diagram with dimensions
8. **Export Functions** - PDF and Excel report generation
9. **Theme Support** - Dark/light mode toggle
10. **Unit System** - Metric/Imperial conversion

## Installation Steps
1. Install Node.js 16+ if needed
2. Run `npm install` to install all dependencies
3. Run `npm run dev` to start development server
4. Application will open at http://localhost:5173

## Build & Production
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- Output goes to `dist/` directory

## Development Commands
- `npm run dev` - Development with hot reload
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Verify TypeScript types

## Configuration Files
- `vite.config.ts` - Vite bundler configuration
- `tsconfig.json` - TypeScript compiler settings
- `.eslintrc.cjs` - Code quality rules
- `package.json` - Dependencies and scripts

## API 2000 Calculation Engine
The calculator (`calculator.ts`) implements:
- Tank volume calculation
- Wetted surface area determination
- Inbreathing capacity (withdrawal + thermal contraction)
- Outbreathing capacity (filling + thermal expansion)
- Emergency venting (fire exposure model)
- Standard vent sizing (2" to 8")
- Safety margin assessment

## Styling System
- CSS variables for consistent theming
- Dark mode support with `body.dark` class
- Responsive grid layouts
- Component-based styles
- Smooth transitions and animations

## Export Capabilities
1. **PDF Export**: Professional report with calculation summary
2. **Excel Export**: Data table with all results and parameters

## Unit System Implementation
- Metric (m, m³, °C) - Default
- Imperial (ft, gallons, °F)
- Automatic conversion on selection
- Display conversion in real-time

## Theme System
- Light/Dark mode toggle in header
- Persistence using localStorage
- System preference detection
- CSS variable-based theming

## Documentation
- Comprehensive README with usage guide
- Inline code comments for key functions
- TypeScript interfaces for type safety
- Calculation methodology documented

## Future Enhancement Opportunities
1. Multi-tank project management
2. Calculation history/templates
3. Advanced fire scenario modeling
4. Cloud storage integration
5. Mobile app version
6. Real-time weather integration

## Quality Assurance
- TypeScript for type safety
- ESLint for code quality
- Responsive design testing
- Cross-browser compatibility
- Accessibility considerations (ARIA labels, keyboard nav)

## Deployment
- Static site - can be deployed to any web server
- No backend required
- All calculations performed client-side
- Suitable for GitHub Pages, Vercel, Netlify, etc.

---

All project setup is complete. Project is ready for development and deployment.
