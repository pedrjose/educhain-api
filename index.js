import express from "express";
import connectDatabase from "./src/database/db.js";

const app = express();
const PORT = 3000;

connectDatabase();

app.use(express.json());

app.listen(PORT, () => {
  console.log(
    `\nEDUCHAIN SERVER IS RUNNING ON ${PORT}!`
  );
});
