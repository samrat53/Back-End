import express from "express";
const app = express();
const PORT = 3000;

const d = new Date();
let day = d.getDay();
let dayCheck = "";
let msg = "";

if (day === 6 || day === 0) {
  dayCheck = "Weekend";
  msg = "ghar pe kaam kro";
} 
else {
  dayCheck = "weekday";
  msg = "har jagah kaam kro";
}

app.get("/", (req, res) => {
  res.render("index.ejs", {
    weekday: dayCheck,
    message: msg,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
