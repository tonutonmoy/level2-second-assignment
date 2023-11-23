import express, { Application, Request, Response } from "express";
import cors from "cors";
import { allRoutes } from "./moduls/routes/router";
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", allRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
