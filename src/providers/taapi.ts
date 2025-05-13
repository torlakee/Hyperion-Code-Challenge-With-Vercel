import axios from "axios";
import { TAAPI_SECRET } from "../config";

export async function fetchIndicators(symbol: string) {
  const interval = "1h";
  const exchange = "binance";
  const indicators = ["rsi", "ema", "sma", "macd"];

  const requests = indicators.map((indicator) =>
    axios.get(`https://api.taapi.io/${indicator}`, {
      params: {
        secret: TAAPI_SECRET,
        exchange,
        symbol: `crypto:${symbol}/USDT`,
        interval,
      },
    })
  );

  const responses = await Promise.all(requests);
  return Object.fromEntries(
    indicators.map((indicator, i) => [indicator, responses[i].data.value])
  );
}