import axios from 'axios';

export async function getTAIndicators(symbol: string) {
  const interval = '1h';
  const formatted = `${symbol}/USDT`;
  const exchange = 'binance';
  const secret = process.env.TAAPI_API_KEY;

  const endpoints = ['rsi', 'macd', 'bbands', 'sma', 'ema', 'atr', 'stoch'];
  const results: Record<string, any> = {};

  for (const endpoint of endpoints) {
    try {
      const { data } = await axios.get(`https://api.taapi.io/${endpoint}`, {
        params: {
          secret,
          exchange,
          symbol: formatted,
          interval,
        },
      });
      results[endpoint] = data;
    } catch (err) {
      console.warn(`Error fetching ${endpoint} for ${symbol}:`, err.message);
    }
  }

  return results;
}
