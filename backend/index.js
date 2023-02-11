const connetToMongo = require("./db");
const express = require("express");
const cors= require('cors')
const bodyParser = require("body-parser");
connetToMongo();
const app = express();
app.use(cors())
app.use(bodyParser.json({ limit: "1024kb" }));
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.get("/api/v1/login", (req, res) => {
//   res.send("Hello! muzammil tum login ho");
// });
// app.get("/api/v1/sigin", (req, res) => {
//   res.send("Hello! muzammil tum sigin ho");
// });
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/auth", require("./routes/auth"));
app.listen(port, () => {
  console.log(`Example app listening http://localhost:${port}`);
});
