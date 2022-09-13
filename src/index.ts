import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
	console.log("Server running on port " + process.env.PORT);
});
