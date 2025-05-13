import { createServer } from "@modelcontextprotocol/sdk";
import { mcpConfig } from "./mcp/config.js";
import { handlePrice, handleTrend } from "./mcp/handlers.js";
import app from "./server.js";
import { env } from "./env.js";

const mcp = createServer(mcpConfig);

mcp.registerTool({ name: "price", schema: { symbol: "string" } }, handlePrice);
mcp.registerTool({ name: "trend", schema: { symbol: "string" } }, handleTrend);

mcp.listen(+env.PORT, () => {
    console.log(`🟢 MCP server running on :${env.PORT}`);
});

app.listen(4000, () => console.log("REST API on :4000"));
