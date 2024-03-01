import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 4000;
const API_URL = "https://api.jikan.moe/v4";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/search", async (req, res) => {
  const yourSearch = req.body.search; //đây là từ khóa anime mình muốn tìm kiếm

  try {
    const response = await axios.get(`${API_URL}/anime?q=${yourSearch}`);
    const data = response.data;

    //console.log(data);

    res.render("index.ejs", { animeResult: data.data });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/anime", async (req, res) => {
  const yourAnime = req.body.animeId; //đây là id anime mà mình click vào sau khi tìm kiếm xong

  try {
    const response = await axios.get(`${API_URL}/anime/${yourAnime}`);
    const data = response.data;

    //console.log(data);

    res.render("index.ejs", { myAnime: data.data });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
