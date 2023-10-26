import express from "express";
import axios from "axios";

const app = express();
const port = 5173;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "";
const yourPassword = "";
let yourAPIKey = "";
const yourBearerToken = "";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message });
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=2",
      {},
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message });
  }

});

app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(API_URL+`/filter`,{
        params:{
          score:5, apiKey: yourAPIKey
        }
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message });
  }

});

app.get("/bearerToken", (req, res) => {
  try {
    const result=axios.get(API_URL+`secrets/2`,{headers: { 
      Authorization: `Bearer ${yourBearerToken}` ,
    }});
    res.render("index.ejs",{content: JSON.stringify(result.data)})
  } catch (error) {
    res.status(404).send(error.message);
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
