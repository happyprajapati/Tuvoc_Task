import express from "express";
const app = express();
import AuthRoutes from "./routes/AuthRoutes.js";
import BookRoutes from "./routes/BookRoutes.js";
import("./connect.js");
import cors from "cors";
import "dotenv/config";

app.use(express.json());
app.use(cors());
// app.use("/uploads", express.static("uploads"));

app.use("/user", AuthRoutes);

app.use("/books", BookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ` + process.env.PORT);
});

