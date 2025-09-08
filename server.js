const express = require("express");
const app = express();
const db = require("./db/connection.js");
const Movie = require("./models/movie.js");
const methodOverride = require("method-override");
const path = require("path");

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

//GET routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/movies", async (req, res) => {
  const moviesData = await Movie.find();
  res.render("movies/index.ejs", { movies: moviesData });
});

app.get("/movies/new", (req, res) => {
  res.render("movies/new.ejs");
});

app.get("/movies/:id", async (req, res) => {
  const movieData = await Movie.findById(req.params.id);
  res.render("movies/show.ejs", { movie: movieData });
});

app.get("/movies/:movieId/edit", async (req, res) => {
  const foundMovie = await Movie.findById(req.params.movieId);
  res.render("movies/edit.ejs", { movie: foundMovie });
});

//POST routes
app.post("/movies", async (req, res) => {
  if (req.body.wouldRecommend === "on") {
    req.body.wouldRecommend = true;
  } else {
    req.body.wouldRecommend = false;
  }
  await Movie.create(req.body);
  console.log(req.body);
  res.redirect("/movies");
});

// PUT route
app.put("/movies/:movieId", async (req, res) => {
  if (req.body.wouldRecommend === "on") {
    req.body.wouldRecommend = true;
  } else {
    req.body.wouldRecommend = false;
  }

  await Movie.findByIdAndUpdate(req.params.movieId, req.body);
  res.redirect(`/movies/${req.params.movieId}`);
});

// DELETE route
app.delete("/movies/:movieId", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.movieId);
  res.redirect("/movies");
});

db.on("connected", () => {
  console.log("connected to mongodb");
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
