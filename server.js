'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const getData = require("./Movie Data/data.json");
require('dotenv').config();
app.use(cors());
const port = process.env.Portnum;
const apiKey=process.env.api_key;



//routes
app.get('/',homePageHandler);
app.get('/favorite',favoritePageHandler);
app.get('/trending',trendingHandler);
app.get('/search',searchHandler);
app.get('/top_rated',topratedHandler);
app.get('/popular', popularHandler);

//should be the last line in routes   //// * => mean any thing than your routes links!!
//app.get('*',handleNotFoundError);


//links to test 
//http://localhost:3001/
//http://localhost:3001/favorite


//functions
function homePageHandler(req,res){
    let result=[];
    let newgetData = new MovieData(getData.title,getData.poster_path,getData.overview);
    result.push(newgetData);
    res.json(result);
}

function favoritePageHandler(req,res){
    res.json('Welcome to Favorite Page');
}

function trendingHandler(req,res){
    //axios.get().then().catch()
        let url= `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
        axios.get(url)
        .then((result)=>{
           
            let movieDetails = result.data.results.map((movie) => {
                return new MovieData(movie.id,movie.title,movie.release_date,movie.poster_path,movie.overview)
            })
            res.json(movieDetails)
        })
        .catch((err)=>{
            console.log(err);
        })
}

function searchHandler(req,res){
    let movieName= req.query.name
    let url=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName} `;
    axios.get(url)
    .then((result)=>{
        let movieR=result.data.results;
        res.json(movieR)
    })
    .catch((err)=>{
        console.log(err);
    })
}

function topratedHandler(req,res){
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
   
    axios.get(url)
    .then((result)=>{
       
        res.json(result.data.results);
    })
     
    
    .catch((err)=>{
        console.log(err);
    })
}
function popularHandler(req, res){
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;
    axios.get(url)
    .then((result)=>{
        res.json(result.data.results);
    })
    .catch((error)=>{
        console.log(error);
    })
}

//constructor
function MovieData(id,title,release_date,poster_path,overview){
    this.id=id;
    this.title=title;
    this.release_date=release_date;
    this.poster_path=poster_path;
    this.overview=overview;
}

//404 not found error
function handleNotFoundError(req,res){
    res.status(404).send("Not Found !");

}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})