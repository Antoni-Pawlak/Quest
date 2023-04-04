const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const getHTML = require("./lib/scraper");
const bodyparser = require("body-parser");
const CircularJSON = require("circular-json");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const url1 = "https://www.instagram.com/kidd_grayson/";
const post = "https://www.instagram.com/p/CpayyjzM2wc/";
const url2 = "https://www.instagram.com/tutenchamen/";

app.post("/follow", async (req, res) => {
  const userUrl = req.body.postUrl
  const { data } = await axios.get(userUrl);

  const $ = cheerio.load(data);
  const mango = $("meta");

  const str = CircularJSON.stringify(mango);
  const resp = JSON.parse(str);
  const followString =
    resp[0].parent.children[2].next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.attribs.content;

  var numbers = followString.match(/\d+/g).map(Number);

  res.json({
    followers: numbers[0],
    following: numbers[1],
    totalPost: numbers[2],
  });
});

app.post("/post", async (req, res) => {
  const postUrl = req.body.postUrl
  const { data } = await axios.get(postUrl);

  const $ = cheerio.load(data);
  const mango = $("meta");

  const str = CircularJSON.stringify(mango);
  const resp = JSON.parse(str);
  const followString =
    resp[0].parent.children[2].next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.attribs.content;

  var numbers = followString.match(/\d+/g).map(Number);

  res.json({
    likes: numbers[0],
    comment: numbers[1],
  });
});

app.post("/comment", async (req, res) => {
  const postUrl = req.body.postUrl
  const { data } = await axios.get(postUrl);

  const $ = cheerio.load(data);
  const mango = $("meta");

  const str = CircularJSON.stringify(mango);
  const resp = JSON.parse(str);
  const commentString =
    resp[0].parent.children[2].next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.children[0].data;

  const lastComment = JSON.parse(commentString).comment;
  res.json({
    comment: lastComment.text,
    author: lastComment.author,
    commentDate: JSON.parse(commentString).dateCreated,
    fulldata: JSON.parse(commentString),
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
