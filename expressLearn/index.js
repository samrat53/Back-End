import express from "express";
const app = express();
const PORT = 5173;

let name = "samrat";
app.get("/", (req, res) => res.send("<h1>GOAT in the making!</h1>"));
app.get(`/samrat`, (req, res) => res.send(`<h1>${name}</h1>`));
app.get(`/contact`, (req, res) =>
  res.send(`<h1>Contact me:</h1><hr><p>Phone: 00880808988</p><p>Found in NITA</p>`)
);
app.get("/about", (req, res) => {
  res.send("<h1>About me:</h1><hr><p>Diurnal Photographer</p><p>Nocturnal Coder</p>");
});
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
dx