import express from 'express';
import dotenv from 'dotenv';
import { mcp } from './api/mcp';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
  try {
    const result = await mcp.execute(req.body);
    res.json(result);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP Express API running at http://localhost:${port}/mcp`);
});
