import express from "express";
const app = express();
const PORT= 3000;
app.use(express.static("public"));
app.get("/",(req,res)=>{
  res.render("index.ejs");
});
app.get("/contact",(req,res)=>{
  res.render("contact.ejs");
});
app.get("/about",(req,res)=>{
  res.render("about.ejs");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
