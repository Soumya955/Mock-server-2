const express = require("express");
const bcrypt = require("bcrypt/bcrypt")
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/User.model");
const SprintModel = require("./Models/Sprint.model");
const TaskModel = require("./Models/Task.model");


const app = express.Router();


app.post("/signup", (req, res) => {
  const {email, password} = req.body;
  bcrypt.hash(password, 5, async function(err, hash) {
      if(err){
          res.send("Something went wrong")
      }
      const user = new UserModel({
          email,
          password : hash
      })
      try{
          await user.save()
          res.json({msg : "Signup is successfull"})
      }
      catch(err){
          console.log(err)
          res.send("Something wrong")
      }
  });
})

app.post("/signin", async (req, res) => {
  const {email, password} = req.body;
  const user = await UserModel.findOne({email})
  const hash = user.password
  bcrypt.compare(password, hash, function(err, result) {
      if(err){
          res.send("Something went wrong")
      }
      if(result){
          const token = jwt.sign({ userId : user._id }, "srb");
          res.json({message : "Login Successfull",token})
      }
      else{
          res.send("Invalid Credentials")
      }
  });
})
const authenticate = (req,res,next) =>{
  if(!req.headers.authorization){
      return res.send("Login First");
  }
  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token,"srb",(err,decode) =>{
      if(err){
          return res.send("Login Please");
      }
      next()
  })
}
// app.use(authenticate)
app.get("/dashboard",(req,res)=>{
  res.json({message:"You can access"})
})


app.post("/sprints",async(req,res)=>{
    let {sprint}=req.body;
    const user = await SprintModel.findOne({sprint});
    if(user){
        res.send("exists")
    }else{
        const user=await SprintModel.create(req.body);
        res.send("notexists")
    }
})
app.get("/sprints",async(req,res)=>{
    const user = await SprintModel.find();
    res.send(user)
})

app.post("/tasks",async(req,res)=>{
    let {name}=req.body;
    const user = await TaskModel.findOne({name});
    if(user){
        res.send("exists")
    }else{
        const user=await TaskModel.create(req.body);
        res.send("notexists")
    }
})
app.get("/tasks",async(req,res)=>{
    const user = await TaskModel.find();
    res.send(user)
})
app.patch("/tasks/:id",async(req,res)=>{
    let {id}=req.params;
    const user = await TaskModel.findByIdAndUpdate(id,req.body);
    res.send(user)
})
app.delete("/tasks/:id",async(req,res)=>{

    let {id}=req.params;
    console.log(id)
    const user = await TaskModel.findByIdAndDelete(id);
    res.send("deleted")
})

module.exports = app;