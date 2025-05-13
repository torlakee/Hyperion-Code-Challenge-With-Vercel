export function classifyTrend(indicators: Record<string, number>): string {
  const { rsi, macd } = indicators;
  if (rsi > 70 || macd > 0.5) return "Trending";
  if (rsi < 30 || macd < -0.5) return "Trending";
  return "Ranging";
}