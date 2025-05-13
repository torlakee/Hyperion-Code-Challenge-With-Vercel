import { fetchIndicators } from "../clients/taapi.js";

export type Indicators = Awaited<ReturnType<typeof fetchIndicators>>;

export async function getIndicators(symbol: string) {
  return fetchIndicators(symbol);
}
