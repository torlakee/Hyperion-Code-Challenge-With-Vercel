import axios from "axios";
import { env } from "../env.js";

const client = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v1/",
  headers: { "X-CMC_PRO_API_KEY": env.CMC_API_KEY }
});

export async function getQuote(symbol: string) {
  const { data } = await client.get("cryptocurrency/quotes/latest", {
    params: { symbol }
  });
  return data.data[symbol.toUpperCase()].quote.USD;
}
