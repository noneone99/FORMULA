export interface ServiceClass {
  id: string;
  code: string; // e.g., "CL-01"
  title: string;
  description: string;
  detailedDescription: string;
  stack: string[];
  basePrice: number;
  deliveryDays: number;
  features: string[];
  idealFor: string;
  proportions: {
    uxUi: number;     // percentage of effort
    development: number;
    optimization: number;
    animation: number;
  };
}

export interface ProportionMetric {
  title: string;
  gordianValue: string;
  translationToObrero: string;
  impactLabel: string;
  visualPercent: number; // visual meter 0-100
}

export interface GordianAspect {
  id: string;
  title: string;
  description: string;
  metrics: ProportionMetric[];
}

export interface CalculatorInput {
  pagesCount: number;
  cmsRequired: boolean;
  p5InteractiveComplexity: "none" | "subtle" | "immersive";
  designComplexity: "minimalist" | "standard" | "ultra_premium";
  urgentDelivery: boolean;
  maintenanceMonths: number;
}

export interface CalculatedInvoice {
  baseHours: number;
  designerHours: number;
  developerHours: number;
  cmsIntegrationCost: number;
  p5Cost: number;
  complexityMultiplier: number;
  subtotal: number;
  urgencyFee: number;
  maintenanceCost: number;
  totalPrice: number;
  hourlyAverage: number;
}

export interface ProposalTemplate {
  clientName: string;
  companyName: string;
  projectScope: string;
  selectedClasses: string[];
  additionalNotes: string;
  validityDays: number;
}
