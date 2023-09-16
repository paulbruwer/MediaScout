const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args)); //so that we can use fetch to get data from 3rd party websites
const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const helmet = require("helmet");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// function to fetch response from 3rd party sever
// response is written to response.json file
const getSearch = async (term, media) => {
  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${term}&media=${media}`
    );
    const json = await res.json();
    try {
      fs.writeFileSync("response.json", JSON.stringify(json));
      return json;
    } catch (e) {
      console.log(e);
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};


//function to read the response.json file i.e. response from 3rd party server
const getData = () =>{
  try {
    const res = fs.readFileSync("response.json")
    const data = JSON.parse(res);
    return data
  } catch (error) {
    return error
  }
}

//function to read to favorite.json file
const getFavorite = () => {
  try {
    const res = fs.readFileSync("favorite.json");
    const data = JSON.parse(res);
    return data
  } catch (error) {
    fs.writeFileSync("favorite.json",'[]');
    console.log(error);
    return []
  }
}

// function to add items to the list inside favorites.json file
// only unique elements will be accepted
const postFavorite = (item) => {
  const data = getFavorite();
  let alreadyExists = false;
  data.map((element) => {
    if (element.trackId === item.trackId){
      alreadyExists = true;
    };
  });
  if (alreadyExists){
    return false
  }else{
    try {
      data.push(item);
      fs.writeFileSync("favorite.json", JSON.stringify(data));
      return true
    } catch (error) {
      console.log(error);
    }
  }
}

// get request to initiate getSearch function and return response
app.get("/search", (req, resp) => {
  const term = req.query.term;
  const media = req.query.media;
  const data = getSearch(term, media);
  resp.send(JSON.stringify(data));
});

// post request to add items to favorite.json
app.post("/favorite", (req, resp) => {
  const data = req.body;
  const success = postFavorite(data);
  if (success){
    resp.send("Item added to favorites");
  }else{
    resp.send("Failed. Item already in favorites");
  }
})

// get request to return favorite.json
app.get("/favorite", (req, resp) => {
  const data = getFavorite();
  resp.send(JSON.stringify(data));
})

// get request to return response.json
app.get("/api", (req,resp) => {
  const data = getData();
  resp.send(JSON.stringify(data));
})

app.listen(port, () => console.log("Listening engaged"));
