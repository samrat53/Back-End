import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const PORT = 5173;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world_flags",
  password: "Samrat@nita",
  port: 5432,
});
db.connect();

let score = 0;
let renderFlag={};
let flagRows=[];

db.query("SELECT * FROM flags", (err, res) => {
  if (err) console.error(`Error in exection query`, err.stack);
  else flagRows = res.rows;
  db.end();
});

app.get("/", async (req, res) => {
  score = 0;
  await nextFlag();
  res.render("index.ejs", { question: renderFlag });
});

app.post("/submit", async(req, res) => {
  let answer = req.body.answer.trim();
  let checkCorrect = false;
  if (renderFlag.name.toLowerCase()=== answer.toLowerCase()) {
    score++;
    console.log(score);
    checkCorrect = true;
  }

  await nextFlag();
  res.render("index.ejs", {
    totalScore: score,
    question: renderFlag,
    wasCorrect: checkCorrect,
  });
});

const nextFlag=async ()=> {
  renderFlag = flagRows[Math.floor(Math.random() * flagRows.length)];
}

app.listen(PORT, () => console.log(`Port http://localhost:${PORT} active`));
