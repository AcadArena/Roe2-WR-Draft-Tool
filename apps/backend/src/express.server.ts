import express from "express";
import { championStore } from "./store";
export const initExpressServer = () => {
  const app = express();
  app.get("/champions", (_, res) => {
    return res.send(Object.fromEntries(championStore));
  });
  return app;
};
