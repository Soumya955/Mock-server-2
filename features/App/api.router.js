const express = require("express");
const ProdModel = require("./prod.model");

const app = express.Router();


app.post("/", async (req, res) => {
  try {
    let newUser = await ProdModel.create(req.body);
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/", async (req, res) => {
  try {
    let { category,order,page } = req.query;
    let data = await ProdModel.find((category)?{category : category}:{})
    .sort({
      postedAt: order == "asc" || order == "ASC" ? 1 : -1,
    }).skip((page-1)*4)
    .limit(4);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/:name", async (req, res) => {
  let {name}=req.params;
  let { category,order,page } = req.query;
  try {
    let data = await ProdModel.find((category)?{name : name,category:category}:{name : name})
    .sort({
      postedAt: order == "asc" || order == "ASC" ? 1 : -1,
    }).skip((page-1)*4)
    .limit(4);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/:id", async (req, res) => {
  let {id}=req.params;
  console.log(id)
  try {
    let data = await ProdModel.findByIdAndDelete(id)
    res.send("Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = app;