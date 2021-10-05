import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js";

const app = express();
mongoose
	.connect(
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

app.get("/api/products/:id", (req, res) => {
	const product = data.products.find((x) => x._id === req.params.id);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({ message: "product not found" });
	}
});

app.get("/api/products", (req, res) => {
	res.send(data.products);
});

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
	res.send("server is ready");
});
app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });// error catcher
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`serve at http://localhost:${port}`); //node backend/server.js {npm start}<-after nodemon in main folder
});
//start backend before frontend in serparate terminals
