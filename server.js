const express = require("express");
const cors = require("cors");
const path = require("path");
const { getTables } = require("./api/floorService");
const { getOrders, writeServedOrders } = require("./api/orderService");
const port = process.env.PORT || 3030;

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.get("/api/tables/", getTables);
app.get("/api/orders/", getOrders);
// app.post("/api/completed/", saveCompleted);
app.get("/api/completed/:data", (req, res) => {
  writeServedOrders(req.params);
  res.send("Ok");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
