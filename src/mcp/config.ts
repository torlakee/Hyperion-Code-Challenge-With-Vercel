import { env } from "../env.js";

export const mcpConfig = {
    apiKey: env.MCP_API_KEY,
    model: "crypto‑trend‑v1",
    description: "Returns trend vs range status for crypto assets on 1h charts"
};
