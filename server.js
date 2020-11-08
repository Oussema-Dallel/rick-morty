const express = require("express");

const path = require("path");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
