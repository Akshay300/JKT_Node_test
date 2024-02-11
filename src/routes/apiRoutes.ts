import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { router } from "../controllers/AmazonS3ServiceController";
import { dbconnect } from "../config/dbconfig";

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

(async () => {
  try {
    await dbconnect();

    app.use("/awsS3Service", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();

export { app };
