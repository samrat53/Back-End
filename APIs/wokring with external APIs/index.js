import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5173;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { error: error.message });
  }
});

app.post("/", async (req, res) => {
  // console.log(req.body);
  const type = req.body.type,
    participants = req.body.participants;
  // console.log(`type= ${type} and participants=${participants}`)
  try {
    const serverResponse = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const serverData = serverResponse.data;
    // console.log(serverData);
    const temp=Math.floor(Math.random() * serverData.length)
    console.log(serverData[temp]);
    res.render("index.ejs",{data:serverData[temp]});
  } catch (error) {
    error.message="No activities that match your criteria."
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", { error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
