/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EngineOil {
  id: string;
  brand: string;
  name: string;
  oilType: 'Synthetic' | 'Semi-Synthetic' | 'Mineral';
  viscosity: string;
  price: number | null; // null represents "Request Price"
  image: string;
  compatibility: string;
  volume: string;
  description: string;
}

export interface PaintRequest {
  id: string;
  customerName: string;
  phone: string;
  vehicleBrand: string;
  model: string;
  year: string;
  paintCode?: string;
  desiredFinish: 'Gloss' | 'Matte' | 'Metallic' | 'Pearl' | 'Satin';
  paintType: 'Basecoat' | 'Single Stage' | 'Clear Coat' | 'Primer' | 'Refinishing';
  quantity: string;
  notes?: string;
  imageUrl?: string;
  status: 'Pending' | 'Reviewing' | 'Matched' | 'Completed';
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  phone: string;
  vehicleDetails: string;
  requestType: 'Engine Oil' | 'Automotive Paint' | 'Both';
  detailedMessage: string;
  status: 'Pending' | 'Processed' | 'Completed';
  createdAt: string;
}

export interface OilFilterState {
  vehicleType: string;
  oilType: string;
  viscosity: string;
  brand: string;
  search: string;
}

export interface RecommendationRequest {
  make: string;
  model: string;
  year: string;
  mileage?: string;
  drivingConditions?: string;
}

export interface PaintRecommendationRequest {
  brand: string;
  model: string;
  year: string;
  colorName?: string;
  colorCode?: string;
  finishType?: string;
}
