const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
   title: String,
   year: Number,
   wouldRecommend: Boolean
});

module.exports = mongoose.model("Movie", movieSchema);