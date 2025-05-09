import { ai } from '@vercel/ai';
import { defineMCPTool } from '@modelcontextprotocol/sdk';
import { getAssetStatus } from '../lib/coinMarketCap';
import { getTAIndicators } from '../lib/taapi';
import { classifyTrend } from '../lib/classifyTrend';

export const mcp = defineMCPTool({
  name: 'crypto-status-checker',
  description: 'Fetches current price and trend status (trending or ranging) for a crypto symbol',
  parameters: {
    type: 'object',
    properties: {
      symbol: {
        type: 'string',
        description: 'The symbol of the crypto asset (e.g., BTC, ETH)',
      },
    },
    required: ['symbol'],
  },
  execute: async ({ symbol }) => {
    const price = await getAssetStatus(symbol);
    const indicators = await getTAIndicators(symbol);
    indicators.price = price;
    const trendStatus = classifyTrend(indicators);

    return {
      symbol,
      price,
      trendStatus,
    };
  },
});

export const POST = ai.mcp(mcp);
