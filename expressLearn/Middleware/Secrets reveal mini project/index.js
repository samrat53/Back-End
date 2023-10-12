import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
let userAuth = false;
let password = "";

app.use(bodyParser.urlencoded({ extended: true }));

const checkPassword = (req, res, next) => {
  password = req.body["password"];
  if (password === "iLoveProgramming") userAuth = true;
  next();
};
app.use(checkPassword);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (userAuth) {
    console.log(`Authentication successfull`);
    res.sendFile(__dirname + "/public/secret.html");
  }
  else {
    console.log(`Incorrect password entry: ${password}`);
    res.redirect("/");
  }
});






//-------------------------does the same---------------------
// let userEntry;
// app.post("/check", (req, res) => {
//   userEntry = req.body["password"];

//   if (userEntry === "iLoveProgramming") {
//     console.log("Correct password: revealing secret");
//     res.sendFile(__dirname + "/public/secret.html");
//   } else {
//     console.log(`incorrect entry: ${userEntry}`);
//     res.sendFile(__dirname + "/public/index.html");
//     // res.redirect("/"); same thing
//   }
// });
