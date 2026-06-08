// Using native fetch available in Node.js 18+

const MELHOR_ENVIO_AUTH_URL = 'https://sandbox.melhorenvio.com.br/oauth/authorize';
const MELHOR_ENVIO_TOKEN_URL = 'https://sandbox.melhorenvio.com.br/oauth/token';
const MELHOR_ENVIO_API_URL = 'https://sandbox.melhorenvio.com.br/api/v2';

export interface MelhorEnvioToken {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface ShippingQuote {
  id: number;
  name: string;
  price: number;
  custom_price: number;
  delivery_time: number;
  custom_delivery_time: number;
  packages: Array<{
    id: number;
    price: number;
    custom_price: number;
    weight: number;
    dimensions: {
      height: number;
      width: number;
      length: number;
    };
  }>;
}

/**
 * Generate OAuth authorization URL for user login
 */
export function getAuthorizationUrl(redirectUri: string): string {
  const clientId = process.env.MELHOR_ENVIO_CLIENT_ID;
  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'shipping-calculate shipping-preview',
  });

  return `${MELHOR_ENVIO_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
  code: string,
  redirectUri: string
): Promise<MelhorEnvioToken> {
  const clientId = process.env.MELHOR_ENVIO_CLIENT_ID;
  const clientSecret = process.env.MELHOR_ENVIO_CLIENT_SECRET;

  const response = await fetch(MELHOR_ENVIO_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to exchange code for token: ${JSON.stringify(error)}`);
  }

  return (await response.json()) as MelhorEnvioToken;
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<MelhorEnvioToken> {
  const clientId = process.env.MELHOR_ENVIO_CLIENT_ID;
  const clientSecret = process.env.MELHOR_ENVIO_CLIENT_SECRET;

  const response = await fetch(MELHOR_ENVIO_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to refresh token: ${JSON.stringify(error)}`);
  }

  return (await response.json()) as MelhorEnvioToken;
}

/**
 * Calculate shipping quotes using Melhor Envio API
 */
export async function calculateShipping(
  accessToken: string,
  fromCEP: string,
  toCEP: string,
  products: Array<{
    id: number;
    width: number;
    height: number;
    length: number;
    weight: number;
    quantity: number;
    price: number;
  }>
): Promise<ShippingQuote[]> {
  const response = await fetch(`${MELHOR_ENVIO_API_URL}/shipment/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      from: {
        postal_code: fromCEP.replace(/\D/g, ''),
      },
      to: {
        postal_code: toCEP.replace(/\D/g, ''),
      },
      products,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Melhor Envio API error:', error);
    throw new Error(`Failed to calculate shipping: ${JSON.stringify(error)}`);
  }

  return (await response.json()) as ShippingQuote[];
}
