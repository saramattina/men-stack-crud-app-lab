const express = require("express");
const app = express();
const db = require("./db/connection.js");
const Movie = require("./models/movie.js")


app.get("/", (req, res) => {
   res.render("index.ejs")
})

app.get("/new", (req, res) => {
   res.render("movies/new.ejs");
})




db.on("connected", () => {
   console.log("connected to mongodb");
   app.listen(3000, () => {
   console.log("Listening on port 3000");
 });
});