import axios from "axios";
import { CMC_API_KEY } from "../config";

export async function fetchPrice(symbol: string): Promise<number> {
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
  const response = await axios.get(url, {
    headers: {
      "X-CMC_PRO_API_KEY": CMC_API_KEY,
    },
    params: {
      symbol,
    },
  });
  return response.data.data[symbol].quote.USD.price;
}