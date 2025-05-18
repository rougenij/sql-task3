//Claude Nijem
//Rouge Nijem
const express = require("express");

const app = express();

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("listening");
});
