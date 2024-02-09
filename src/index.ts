// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import fileSystem from "./fileSystemRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("*", fileSystem);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
