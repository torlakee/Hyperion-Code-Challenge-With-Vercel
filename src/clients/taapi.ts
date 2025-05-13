import axios from "axios";
import { env } from "../env.js";

const client = axios.create({
  baseURL: "https://api.taapi.io/",
  params: { secret: env.TAAPI_KEY, interval: "1h" }
});

export async function fetchIndicators(symbol: string) {
  const [rsi, macd, atr, bb, stoch] = await Promise.all([
    client.get("rsi", { params: { exchange: "binance", symbol } }),
    client.get("macd", { params: { exchange: "binance", symbol } }),
    client.get("atr", { params: { exchange: "binance", symbol } }),
    client.get("bb", { params: { exchange: "binance", symbol } }),
    client.get("stoch", { params: { exchange: "binance", symbol } })
  ]);

  return {
    rsi: rsi.data.value,
    macd: macd.data.valueMACD,
    macdSignal: macd.data.valueSignal,
    atr: atr.data.value,
    bbLower: bb.data.valueLowerBand,
    bbUpper: bb.data.valueUpperBand,
    stochK: stoch.data.valueFastK,
    stochD: stoch.data.valueFastD
  } as const;
}
