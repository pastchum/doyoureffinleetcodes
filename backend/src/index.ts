import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const port = 4000;

app.get("/ping", (_req: Request, res: Response) => {
  res.send("Server is active");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});