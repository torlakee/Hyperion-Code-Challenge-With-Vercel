import axios from 'axios';

export async function getAssetStatus(symbol: string): Promise<number> {
  const response = await axios.get(
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
    {
      params: { symbol },
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY!,
      },
    }
  );
  return response.data.data[symbol].quote.USD.price;
}
