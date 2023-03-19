'use strict';

const express = require('express')
const app = express()
const port = 3001

const getData = require("./Movie Data/data.json")

app.get('/',homePageHandler);
app.get('/favorite',favoritePageHandler);

function favoritePageHandler(req,res){
    res.json('Welcome to Favorite Page');
}
function homePageHandler(req,res){
    let result=[];
    let newgetData = new MovieData(getData.title,getData.poster_path,getData.overview);
    result.push(newgetData);
    res.json(result);
}

function MovieData(title,poster_path,overview){
    this.title=title;
    this.poster_path=poster_path;
    this.overview=overview;
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})