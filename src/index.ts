import express from "express";
import { fetchPrice } from "./providers/coinmarketcap";
import { fetchIndicators } from "./providers/taapi";
import { classifyTrend } from "./utils/classify";
import dotenv from "dotenv";
import { mcp } from "@modelcontextprotocol/sdk";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/analyze/:symbol", async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  try {
    const [price, indicators] = await Promise.all([
      fetchPrice(symbol),
      fetchIndicators(symbol),
    ]);
    const trendStatus = classifyTrend(indicators);
    res.json({ symbol, price, indicators, trendStatus });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

if (require.main === module) {
  const mode = process.argv[2];
  if (mode === "mcp") {
    mcp.model("crypto-analyzer", async ({ input }) => {
      const { symbol } = input;
      const [price, indicators] = await Promise.all([
        fetchPrice(symbol),
        fetchIndicators(symbol),
      ]);
      const trendStatus = classifyTrend(indicators);
      return { symbol, price, indicators, trendStatus };
    });
  } else {
    app.listen(port, () => {
      console.log(`HTTP server running on http://localhost:${port}`);
    });
  }
}

export default app;