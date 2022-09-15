import app from "../src/index";
import dotenv from "dotenv";

dotenv.config();

app.listen(process.env.PORT || 5000, () => {
	console.log("Server running on port " + process.env.PORT);
});
