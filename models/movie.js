const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
   title: String,
   yearReleased: Number,
   wouldRecommend: Boolean
});

module.exports = mongoose.model("Movie", movieSchema);