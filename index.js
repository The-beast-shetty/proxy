const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const api = require("./api");

const app = express();
dotenv.config();
app.use(cors({ origin: "https://beastman.web.app" }));
// app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const encryptedBeastmanData = req.headers.dps;
    const ipAddress = req.socket.remoteAddress;
    const headerIp = req.headers['x-forwarded-for']
    const ipv6Regx = /::ffff:(\d+\.\d+\.\d+\.\d+)/;
    const ipv6Match = ipv6Regx.exec(ipAddress);

    const ipv6Address = ipv6Match? ipv6Match[1]:null
    console.log({ipAddress,ipv6Address,headerIp});

    const response = await api(encryptedBeastmanData,ipv6Address);
    res.send(response);
  } catch (error) {
    res.send({ code: 1001, data: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("proxy for beastman");
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`listening on ${process.env.PORT || 5000}`)
);
