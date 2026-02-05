import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./controllers/item";

import { connectDB } from "./config/dataBase";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use("/items", itemsRouter);


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on PORT::${PORT}`));
});