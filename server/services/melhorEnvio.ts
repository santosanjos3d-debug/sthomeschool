import axios from 'axios';

const MELHOR_ENVIO_API = 'https://api.melhorenvio.com.br/v2';
const MELHOR_ENVIO_OAUTH_URL = 'https://api.melhorenvio.com.br/oauth';
const MELHOR_ENVIO_CLIENT_ID = process.env.MELHOR_ENVIO_CLIENT_ID;
const MELHOR_ENVIO_CLIENT_SECRET = process.env.MELHOR_ENVIO_CLIENT_SECRET;

// Cache para token de acesso
let accessToken: string = '';
let tokenExpiry: number = 0;

interface ShippingQuote {
  id: number;
  name: string;
  price: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  currency: string;
  custom_price: string;
  discount: string;
  insurance_value: string;
  source: string;
  company: {
    id: number;
    name: string;
    picture: string;
  };
}

interface ShippingCalculationParams {
  from: {
    postal_code: string;
  };
  to: {
    postal_code: string;
  };
  products: Array<{
    id: string;
    width: number;
    height: number;
    length: number;
    weight: number;
    insurance_value: number;
    quantity: number;
  }>;
}

async function getAccessToken(): Promise<string> {
  // Se temos um token válido em cache, retorna
  if (accessToken !== '' && tokenExpiry > Date.now()) {
    return accessToken;
  }

  try {
    if (!MELHOR_ENVIO_CLIENT_ID || !MELHOR_ENVIO_CLIENT_SECRET) {
      throw new Error('Credenciais do Melhor Envio não configuradas');
    }

    const response = await axios.post(
      `${MELHOR_ENVIO_OAUTH_URL}/token`,
      {
        grant_type: 'client_credentials',
        client_id: MELHOR_ENVIO_CLIENT_ID,
        client_secret: MELHOR_ENVIO_CLIENT_SECRET,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    accessToken = response.data.access_token;
    // Token expira em 1 hora, mas renovamos em 55 minutos para segurança
    tokenExpiry = Date.now() + (55 * 60 * 1000);

    return accessToken;
  } catch (error) {
    console.error('Erro ao obter token de acesso:', error);
    throw new Error('Falha ao autenticar com Melhor Envio');
  }
}

export async function calculateShipping(params: ShippingCalculationParams): Promise<ShippingQuote[]> {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${MELHOR_ENVIO_API}/shipment/calculate`,
      params,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    throw new Error('Falha ao calcular frete. Tente novamente.');
  }
}

export async function generateLabel(shipmentData: any) {
  try {
    const token = await getAccessToken();

    const response = await axios.post(
      `${MELHOR_ENVIO_API}/shipment/generate`,
      shipmentData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao gerar etiqueta:', error);
    throw new Error('Falha ao gerar etiqueta. Tente novamente.');
  }
}

export async function trackShipment(trackingCode: string) {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      `${MELHOR_ENVIO_API}/shipment/tracking`,
      {
        params: { code: trackingCode },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Erro ao rastrear envio:', error);
    throw new Error('Falha ao rastrear envio. Tente novamente.');
  }
}
