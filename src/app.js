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
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions));

app.use("/template", templateRoute);

export default app;
