import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default("8000"),
    CMC_API_KEY: z.string(),
    TAAPI_KEY: z.string(),
    OPENAI_API_KEY: z.string(),
    MCP_API_KEY: z.string()
});

export const env = envSchema.parse(process.env);
