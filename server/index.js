const express = require("express");
const app = express();
var cors = require("cors");
const port = 8080;

app.use(cors());

app.get("/getUserFromUid", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
