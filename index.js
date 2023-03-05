const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const api = require("./api");

const app = express();
dotenv.config();
app.use(cors({ origin: "https://beastman.web.app" }));
// app.use(cors());

app.get("/proxy", async (req, res) => {
  const encryptedBeastmanData = req.headers.dps;

  const response = await api(encryptedBeastmanData);
  res.send(response);
});

app.get("/", (req, res) => {
  res.send("proxy for beastman");
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`listening on ${process.env.PORT || 5000}`)
);
