import express from "express";
import { resolve } from "path";
import { sanitizedChampList } from "./lib/sanitizedChampList";

export const initExpressServer = () => {
  const app = express();
  app.get("/champions", (_, res) => {
    return res.send(sanitizedChampList());
  });

  app.get("/img", (req, res) => {
    const { path = "" } = req.query as Record<"path", string>;
    res.sendFile(resolve(__dirname, `../${decodeURI(path)}`));
  });
  return app;
};
