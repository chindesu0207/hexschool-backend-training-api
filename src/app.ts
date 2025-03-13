import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response) => {
  res.status(404).send(`<h1>404 - 找不到網頁</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
