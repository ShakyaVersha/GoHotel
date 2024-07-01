const express = require("express");
const cors = require("cors");

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

const PORT = 4000;

app.listen(PORT, () => {
  console.log("Server is running on : " + PORT);
});
