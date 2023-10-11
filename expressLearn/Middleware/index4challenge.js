import express from "express";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;
let finalName = "";

app.use(bodyParser.urlencoded({ extended: true })); //mounting body parser

const nameGenerator = (req, res, next) => {
  console.log(req.body);
  finalName = req.body["street"] + req.body["pet"];
  next();
};
app.use(nameGenerator); //mounting custom middleware

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
//   let finalName=req.body["street"]+req.body["pet"]; //this is also perfectly fine
  res.send(`<h1>Brand name</h1><h2>${finalName}</h2>`);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
