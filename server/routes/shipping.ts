import { Router, Request, Response } from 'express';
import { calculateShipping } from '../services/melhorEnvio';

const router = Router();

interface CalculateShippingRequest {
  fromPostalCode: string;
  toPostalCode: string;
  products: Array<{
    id: string;
    width: number;
    height: number;
    length: number;
    weight: number;
    insuranceValue: number;
    quantity: number;
  }>;
}

router.post('/calculate', async (req: Request, res: Response) => {
  try {
    const { fromPostalCode, toPostalCode, products } = req.body as CalculateShippingRequest;

    // Validar entrada
    if (!fromPostalCode || !toPostalCode || !products || products.length === 0) {
      return res.status(400).json({
        error: 'CEP de origem, CEP de destino e produtos são obrigatórios',
      });
    }

    // Formatar dados para API do Melhor Envio
    const params = {
      from: {
        postal_code: fromPostalCode.replace(/\D/g, ''),
      },
      to: {
        postal_code: toPostalCode.replace(/\D/g, ''),
      },
      products: products.map((p) => ({
        id: p.id,
        width: p.width,
        height: p.height,
        length: p.length,
        weight: p.weight,
        insurance_value: p.insuranceValue,
        quantity: p.quantity,
      })),
    };

    // Chamar API do Melhor Envio
    const quotes = await calculateShipping(params);

    // Formatar resposta
    const formattedQuotes = quotes.map((quote) => ({
      id: quote.id,
      name: quote.name,
      price: parseFloat(quote.price),
      deliveryTime: quote.delivery_time,
      deliveryRange: quote.delivery_range,
      company: quote.company.name,
      companyLogo: quote.company.picture,
    }));

    res.json({
      success: true,
      quotes: formattedQuotes,
    });
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    res.status(500).json({
      error: 'Falha ao calcular frete. Tente novamente.',
    });
  }
});

export default router;
