import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(
		process.env.MONGODB_URL ||
			"mongodb+srv://dustin:Gecko123@cluster0.8mmaf.mongodb.net/lolasSnackShack?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then((res) => console.log("db connected"))
	.catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	// we're connected!
	console.log("Testing mongoose db.once method");
});

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.get("/", (req, res) => {
	res.send("server is ready");
});
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message }); // error catcher
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`serve at http://localhost:${port}`); //node backend/server.js {npm start}<-after nodemon in main folder
});
//start backend before frontend in serparate terminals
