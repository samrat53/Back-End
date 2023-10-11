import express from "express"
const app= express();
const PORT=3000;

const logger=(req,res,next)=>{
    console.log(`request method: ${req.method}`);
    console.log(`request url: ${req.url}`);
    next();
}

app.use(logger);

app.get("/",(req,res)=>res.send("Hello"));
app.listen(PORT,()=> console.log(`Listening on port ${PORT}`));

