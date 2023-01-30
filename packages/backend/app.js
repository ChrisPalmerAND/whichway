import propertyRouter from "./routes/propertyRoutes.js";

import * as dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config();
app.use(express.json());
const port = process.env.PORT || 8080;
app.use(express.json());
// to remove CORS issue to frontend(development)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/property", propertyRouter);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
