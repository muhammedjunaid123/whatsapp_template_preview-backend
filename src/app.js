import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import templateRoute from "./routers/template.route.js";
dotenv.config({
  path: "./.env",
});

const app = express();

var corsOptions = {
  origin: process.env.domain,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
import { specs, swaggerUi } from "./swagger.js";
import { errorHandler } from "./middlewares/error.middlewares.js";
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/template", templateRoute);
app.use(errorHandler)

export default app;
