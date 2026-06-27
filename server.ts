/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing with higher limits to support base64 image uploads for paint stickers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Lazy initializer for Google GenAI SDK
let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in the environment secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// In-Memory Database for demonstration and real-time dashboard persistence
interface PaintInquiry {
  id: string;
  customerName: string;
  phone: string;
  vehicleBrand: string;
  model: string;
  year: string;
  paintCode?: string;
  desiredFinish: string;
  paintType: string;
  quantity: string;
  notes?: string;
  imageUrl?: string;
  status: string;
  createdAt: string;
}

interface QuoteInquiry {
  id: string;
  customerName: string;
  phone: string;
  vehicleDetails: string;
  requestType: string;
  detailedMessage: string;
  status: string;
  createdAt: string;
}

const paintInquiries: PaintInquiry[] = [
  {
    id: 'p-req-1',
    customerName: 'Alistair Vance',
    phone: '+44 7911 123456',
    vehicleBrand: 'BMW',
    model: 'M3 Competition',
    year: '2022',
    paintCode: 'C4G (Isle of Man Green)',
    desiredFinish: 'Metallic',
    paintType: 'Basecoat',
    quantity: '2.5 Litres',
    notes: 'Need a perfect factory match for bumper scuff repair. High metallic flake size preferred.',
    status: 'Matched',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
  },
  {
    id: 'p-req-2',
    customerName: 'Juliana Rossi',
    phone: '+39 347 555 1234',
    vehicleBrand: 'Alfa Romeo',
    model: 'Giulia Quadrifoglio',
    year: '2020',
    paintCode: '361B (Rosso Competizione)',
    desiredFinish: 'Pearl',
    paintType: 'Refinishing',
    quantity: '1.5 Litres',
    notes: 'Tri-coat pearl finish. Needs corresponding ground coat and mid coat recommendations.',
    status: 'Reviewing',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
  }
];

const quoteInquiries: QuoteInquiry[] = [
  {
    id: 'q-req-1',
    customerName: 'Marcus Brodie',
    phone: '+1 555-0199',
    vehicleDetails: '2018 Toyota Hilux 2.8 D-4D',
    requestType: 'Engine Oil',
    detailedMessage: 'Looking for 10 drums of heavy-duty mineral 15W-40 for our fleet vehicles. Please quote best bulk pricing.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(), // 8 hours ago
  }
];

// ------------------------------------------------------------------
// API ENDPOINTS
// ------------------------------------------------------------------

// Get Paint Inquiries
app.get('/api/requests/paint', (req, res) => {
  res.json(paintInquiries);
});

// Post Paint Inquiry
app.post('/api/requests/paint', (req, res) => {
  const {
    customerName,
    phone,
    vehicleBrand,
    model,
    year,
    paintCode,
    desiredFinish,
    paintType,
    quantity,
    notes,
    imageUrl,
  } = req.body;

  if (!customerName || !phone || !vehicleBrand || !model || !year || !desiredFinish || !paintType || !quantity) {
    return res.status(400).json({ error: 'Missing required inquiry parameters.' });
  }

  const newInquiry: PaintInquiry = {
    id: `p-req-${Date.now()}`,
    customerName,
    phone,
    vehicleBrand,
    model,
    year,
    paintCode,
    desiredFinish,
    paintType,
    quantity,
    notes,
    imageUrl,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  paintInquiries.unshift(newInquiry);
  res.status(201).json(newInquiry);
});

// Update Paint Inquiry Status
app.patch('/api/requests/paint/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const inquiry = paintInquiries.find((p) => p.id === id);
  if (!inquiry) return res.status(404).json({ error: 'Inquiry not found.' });
  if (status) inquiry.status = status;
  res.json(inquiry);
});

// Get Quote Inquiries
app.get('/api/requests/quote', (req, res) => {
  res.json(quoteInquiries);
});

// Post Quote Inquiry
app.post('/api/requests/quote', (req, res) => {
  const { customerName, phone, vehicleDetails, requestType, detailedMessage } = req.body;

  if (!customerName || !phone || !vehicleDetails || !requestType || !detailedMessage) {
    return res.status(400).json({ error: 'Missing required quote parameters.' });
  }

  const newQuote: QuoteInquiry = {
    id: `q-req-${Date.now()}`,
    customerName,
    phone,
    vehicleDetails,
    requestType,
    detailedMessage,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  quoteInquiries.unshift(newQuote);
  res.status(201).json(newQuote);
});

// Update Quote Inquiry Status
app.patch('/api/requests/quote/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const quote = quoteInquiries.find((q) => q.id === id);
  if (!quote) return res.status(404).json({ error: 'Quote request not found.' });
  if (status) quote.status = status;
  res.json(quote);
});

// AI Engine Oil Recommendation Endpoint
app.post('/api/recommend/oil', async (req, res) => {
  try {
    const { make, model, year, mileage, drivingConditions } = req.body;

    if (!make || !model || !year) {
      return res.status(400).json({ error: 'Vehicle make, model, and year are required.' });
    }

    const ai = getGeminiAI();
    const prompt = `You are a professional automotive technician and tribologist. 
    Analyze this vehicle:
    - Make: ${make}
    - Model: ${model}
    - Year: ${year}
    - Mileage: ${mileage || 'Not specified'}
    - Driving Conditions: ${drivingConditions || 'Standard/mixed'}

    Provide the ideal engine oil recommendation in structured JSON format. Return strictly valid JSON containing these fields:
    1. "viscosity" - e.g., "5W-30" (or secondary alternatives if applicable)
    2. "oilType" - synthetic, semi-synthetic, or mineral
    3. "specifications" - API, ACEA, or manufacturer approvals (e.g., ILSAC GF-6, BMW Longlife-01)
    4. "recommendedBrands" - array of 3 top brand choices (e.g., Mobil 1, Shell, Castrol, Liqui Moly)
    5. "explanation" - beautiful, detailed, professional paragraph explaining why this oil suits this specific engine, taking year and mileage into account.
    6. "interval" - recommended change interval in km and months (e.g., "10,000 km or 12 months").
    7. "oilFilterType" - type of oil filter to use (e.g., "Spin-on", "Cartridge").
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            viscosity: { type: Type.STRING },
            oilType: { type: Type.STRING },
            specifications: { type: Type.STRING },
            recommendedBrands: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            explanation: { type: Type.STRING },
            interval: { type: Type.STRING },
            oilFilterType: { type: Type.STRING },
          },
          required: ['viscosity', 'oilType', 'specifications', 'recommendedBrands', 'explanation', 'interval', 'oilFilterType']
        }
      }
    });

    const recommendationText = response.text;
    if (!recommendationText) {
      throw new Error('No recommendation text returned from Gemini API.');
    }

    res.json(JSON.parse(recommendationText.trim()));
  } catch (error: any) {
    console.error('Gemini Oil Recommendation Error:', error);
    res.status(500).json({
      error: 'AI Recommendation Service currently unavailable.',
      details: error.message || error,
    });
  }
});

// AI Paint Color Match Guidance Endpoint
app.post('/api/recommend/paint', async (req, res) => {
  try {
    const { brand, model, year, colorName, colorCode, finishType, imageBase64 } = req.body;

    if (!brand || !model || !year) {
      return res.status(400).json({ error: 'Vehicle brand, model, and year are required.' });
    }

    const ai = getGeminiAI();
    let contents: any[] = [];

    let imagePart;
    if (imageBase64) {
      // Split off the header data:image/png;base64, if present
      const base64Clean = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      imagePart = {
        inlineData: {
          mimeType: 'image/png',
          data: base64Clean,
        },
      };
    }

    const textPrompt = `You are a professional automotive paint refit specialist and color-matching expert.
    Analyze the requested vehicle and paint parameters:
    - Vehicle: ${year} ${brand} ${model}
    - Stated Color Name: ${colorName || 'Not specified'}
    - Color Code: ${colorCode || 'Not specified'}
    - Desired Finish: ${finishType || 'Standard Metallic / Gloss'}

    ${imageBase64 ? 'I have attached a photo of the vehicle paint or the paint code sticker for your reference. Analyze the visual features if possible.' : ''}

    Provide expert color matching and formulation suggestions in structured JSON format. Return strictly valid JSON containing these fields:
    1. "matchingColorName" - verified color name (e.g., "Deep Sapphire Metallic")
    2. "typicalColorCodes" - typical color codes for this make/year (e.g., "LX7W", "775")
    3. "primerRecommendation" - recommended primer color tone (e.g., "Mid-Grey Primer to ensure accurate color opacity")
    4. "coatFormulation" - details of basecoat, midcoat, clearcoat layers needed (e.g., "Needs 2 basecoats of color mix, followed by 2 premium clear coats")
    5. "proTips" - array of 3 professional painting tips for this vehicle and finish (sanding grit, flashing times, spray techniques)
    6. "estimatedMatchDifficulty" - "Easy", "Medium", or "High" with a brief reason.
    `;

    if (imagePart) {
      contents = [imagePart, { text: textPrompt }];
    } else {
      contents = [textPrompt];
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchingColorName: { type: Type.STRING },
            typicalColorCodes: { type: Type.STRING },
            primerRecommendation: { type: Type.STRING },
            coatFormulation: { type: Type.STRING },
            proTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedMatchDifficulty: { type: Type.STRING }
          },
          required: ['matchingColorName', 'typicalColorCodes', 'primerRecommendation', 'coatFormulation', 'proTips', 'estimatedMatchDifficulty']
        }
      }
    });

    const recommendationText = response.text;
    if (!recommendationText) {
      throw new Error('No recommendation text returned from Gemini API.');
    }

    res.json(JSON.parse(recommendationText.trim()));
  } catch (error: any) {
    console.error('Gemini Paint Match Error:', error);
    res.status(500).json({
      error: 'AI Paint matching service currently unavailable.',
      details: error.message || error,
    });
  }
});

// ------------------------------------------------------------------
// VITE OR STATIC SERVING MIDDLEWARE
// ------------------------------------------------------------------

async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware loaded in DEVELOPMENT mode.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving compiled static files from dist in PRODUCTION mode.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Server failed to start:', err);
});
