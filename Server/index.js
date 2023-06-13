const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const productRoute = require("./routers/product");
const cartRoute = require("./routers/cart");
const orderRoute = require("./routers/order");
const paymentRoute = require("./routers/payment");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connection Successful!"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", paymentRoute);
app.use("/api/orders", orderRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
