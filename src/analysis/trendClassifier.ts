import { Indicators } from "./computeIndicators.js";
import { streamText } from "ai";

export async function classifyTrend(symbol: string, ind: Indicators): Promise<"trending" | "ranging"> {
  const isTrendingHard =
    Math.abs(ind.macd) > Math.abs(ind.macdSignal) &&
    (ind.rsi > 60 || ind.rsi < 40) &&
    (ind.stochK > 80 || ind.stochK < 20);

  if (isTrendingHard) return "trending";

  const prompt = \`You are a crypto trading assistant. Here are 1‑hour indicator readings for \${symbol}:
RSI: \${ind.rsi}
MACD: \${ind.macd} (signal \${ind.macdSignal})
ATR: \${ind.atr}
Bollinger Upper: \${ind.bbUpper}, Lower: \${ind.bbLower}
Stochastic K: \${ind.stochK}, D: \${ind.stochD}
Respond with a single word: "trending" if price direction is strong, "ranging" otherwise.\`;

  const { text } = await streamText({
    model: "gpt-4o-mini",
    prompt,
    maxTokens: 1
  });
  return text.trim().toLowerCase() === "trending" ? "trending" : "ranging";
}
