/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EngineOil } from '../types';

export const FEATURED_OILS: EngineOil[] = [
  {
    id: 'oil-1',
    brand: 'Texaco Havoline',
    name: 'Havoline ProDS Full Synthetic 5W-30',
    oilType: 'Synthetic',
    viscosity: '5W-30',
    price: 32500,
    volume: '5 Litres',
    image: '/images/lp3.jpg',
    compatibility: 'Modern petrol and diesel passenger cars, SUVs, light vans',
    description: 'Premium fully synthetic engine oil with Deposit Shield technology. Outstanding wear protection, engine cleanliness, and active fuel efficiency.'
  },
  {
    id: 'oil-2',
    brand: 'Texaco Havoline',
    name: 'Havoline Synthetic Active Clean 5W-40',
    oilType: 'Synthetic',
    viscosity: '5W-40',
    price: 35000,
    volume: '5 Litres',
    image: '/images/lp4.jpg',
    compatibility: 'High-performance gasoline and diesel engines, turbocharged models',
    description: 'Advanced fully synthetic formula providing active thermal stability and superior wear defense under extreme heat.'
  },
  {
    id: 'oil-3',
    brand: 'Texaco Havoline',
    name: 'Havoline ProDS Full Synthetic 0W-20',
    oilType: 'Synthetic',
    viscosity: '0W-20',
    price: 38000,
    volume: '4 Litres',
    image: '/images/lp4.jpg',
    compatibility: 'Modern hybrid and highly efficient downsized petrol engines',
    description: 'Ultra-low viscosity fully synthetic oil designed to maximize fuel economy and shield engine components at cold starts.'
  },
  {
    id: 'oil-4',
    brand: 'Texaco Ursa',
    name: 'Ursa Ultra LE Heavy Duty 15W-40',
    oilType: 'Synthetic',
    viscosity: '15W-40',
    price: 28500,
    volume: '5 Litres',
    image: '/images/lp4.jpg',
    compatibility: 'Heavy-duty diesel engines, commercial fleets, SUVs and pickups',
    description: 'Premium synthetic technology heavy-duty engine oil offering outstanding soot dispersancy and component wear protection.'
  },
  {
    id: 'oil-5',
    brand: 'Texaco Havoline',
    name: 'Havoline Premium Semi-Synthetic 10W-40',
    oilType: 'Semi-Synthetic',
    viscosity: '10W-40',
    price: 24500,
    volume: '5 Litres',
    image: '/images/lp4.jpg',
    compatibility: 'Daily driver passenger cars and SUVs operating in warm climates',
    description: 'Formulated with high-quality synthetic and mineral base stocks to shield engines against sludge and carbon deposits.'
  },
  {
    id: 'oil-6',
    brand: 'Texaco Havoline',
    name: 'Havoline High Mileage 20W-50',
    oilType: 'Mineral',
    viscosity: '20W-50',
    price: 19500,
    volume: '5 Litres',
    image: '/images/lp4.jpg',
    compatibility: 'High-mileage passenger cars, older petrol/diesel vehicles',
    description: 'Thicker viscosity mineral oil formulated specifically to reduce oil leaks, seal rings, and minimize smoke in high-mileage engines.'
  },
  {
    id: 'oil-7',
    brand: 'Texaco Ursa',
    name: 'Ursa Premium TD Heavy Duty Drum',
    oilType: 'Mineral',
    viscosity: '15W-40',
    price: 480000,
    volume: '208 Litres',
    image: '/images/lp5.jpg',
    compatibility: 'Commercial transport trucks, agricultural machinery, construction fleets',
    description: 'Industrial-grade bulk steel drum containing heavy-duty diesel engine oil for maximum fleet wear protection.'
  },
  {
    id: 'oil-8',
    brand: 'Texaco Havoline',
    name: 'Havoline Motor Oil 20W-50',
    oilType: 'Mineral',
    viscosity: '20W-50',
    price: 16500,
    volume: '4 Litres',
    image: '/images/lp4.jpg',
    compatibility: 'Daily driving passenger cars, classic and older engines',
    description: 'Reliable engine protection with high thermal stability to withstand hot tropical climates.'
  }
];

export const OIL_BRANDS = ['All Brands', 'Texaco Havoline', 'Texaco Ursa'];
export const OIL_VISCOSITIES = ['All Viscosities', '0W-20', '5W-30', '5W-40', '10W-40', '15W-40', '20W-50'];
export const OIL_TYPES = ['All Types', 'Synthetic', 'Semi-Synthetic', 'Mineral'];
export const VEHICLE_TYPES = ['All Vehicles', 'Passenger Cars', 'SUVs & Light Trucks', 'Heavy Duty / Commercial', 'Classic / Vintage'];

export const MOCK_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sarah Jenkins',
    role: 'Fleet Manager, Apex Logistics',
    comment: 'Buying high-volume Texaco Ursa engine oil for our transport fleets has never been easier. Quick WhatsApp confirmations, and the delivery is always on time.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Marcus Vance',
    role: 'Automotive Restorer & Custom Builder',
    comment: 'The paint matching assistant tool gave me the exact color recommendations for a vintage 1974 Corvette. Absolute lifesaver for matching faded metallic pearl paint!',
    rating: 5
  },
  {
    id: 't-3',
    name: 'David K.',
    role: 'Car Enthusiast',
    comment: 'Excellent customer service. I uploaded a photo of my vehicle\'s paint code sticker, and within an hour, they quoted me the exact match on WhatsApp. Exceptional service!',
    rating: 5
  }
];
