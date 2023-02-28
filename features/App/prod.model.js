const mongoose = require("mongoose");


const prodSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  location: { type: String },
  postedAt: { type: String },
  price: { type: String },

});

const ProdModel = mongoose.model("prod", prodSchema);

module.exports = ProdModel;
