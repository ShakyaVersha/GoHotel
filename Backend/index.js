const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

const mongoDB = require("./db");

// Update the cors middleware to allow requests from localhost:5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

mongoDB();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/", require("./Routes/CreateUser"));
app.use("/api/", require("./Routes/DisplayData"));

const PORT = process.env.PORT || 4000;
const HOST = "0.0.0.0"; // Bind to all network interfaces

// Listen on HOST and PORT
app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
