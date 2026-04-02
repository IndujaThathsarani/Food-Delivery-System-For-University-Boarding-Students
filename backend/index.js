require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const groupOrderRoutes = require("./routes/groupOrderRoutes");
const orderRoutes = require("./routes/orderRoutes");

const stripeRoutes = require("./routes/stripeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/group-orders", groupOrderRoutes);
app.use("/api/stripe", stripeRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });