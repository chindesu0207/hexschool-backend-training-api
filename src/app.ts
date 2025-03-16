import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import indexRouter from "./routes";
import prisma from "./prisma";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", indexRouter);

app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).send(`<h1>404 - 找不到網頁</h1>`);
});

async function startServer() {
  try {
    await prisma.$connect();
    console.log("資料庫連線成功");

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("資料庫連線失敗:", error);
    process.exit(1);
  }
}

startServer();
