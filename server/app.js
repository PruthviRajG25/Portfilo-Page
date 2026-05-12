import cors from "cors";
import express from "express";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_request, response) => {
  response.status(200).json({ ok: true });
});

export default app;
