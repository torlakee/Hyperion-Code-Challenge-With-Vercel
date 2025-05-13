import type { MCPRequest, MCPResponse } from "@modelcontextprotocol/sdk";
import { getIndicators } from "../analysis/computeIndicators.js";
import { classifyTrend } from "../analysis/trendClassifier.js";
import { getQuote } from "../clients/coinMarketCap.js";

export async function handlePrice(req: MCPRequest): Promise<MCPResponse> {
    const symbol = String(req.body.symbol).toUpperCase();
    const price = await getQuote(symbol);
    return { data: { symbol, price } };
}

export async function handleTrend(req: MCPRequest): Promise<MCPResponse> {
    const symbol = String(req.body.symbol).toUpperCase();
    const indicators = await getIndicators(symbol);
    const regime = await classifyTrend(symbol, indicators);
    return { data: { symbol, regime, indicators } };
}
