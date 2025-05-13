import express from "express";
import { handlePrice, handleTrend } from "./mcp/handlers.js";

const app = express();
app.use(express.json());

app.post("/price", async (req, res) => {
    const out = await handlePrice(req as any);
    res.json(out);
});

app.post("/trend", async (req, res) => {
    const out = await handleTrend(req as any);
    res.json(out);
});

export default app;
