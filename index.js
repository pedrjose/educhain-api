import express from "express";
import connectDatabase from "./src/database/db.js";
import { corsAuth } from "./src/middlewares/cors.middleware.js";

import institutionRoute from "./src/routes/institution.routes.js";

const app = express();
const PORT = 3000;

connectDatabase();

app.use(express.json());
app.use("/institution", corsAuth, institutionRoute);

app.listen(PORT, () => {
  console.log(`\nEDUCHAIN SERVER IS RUNNING ON ${PORT}!`);
});
