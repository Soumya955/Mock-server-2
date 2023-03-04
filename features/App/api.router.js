const express = require("express");
const bcrypt = require("bcrypt/bcrypt")
const jwt = require("jsonwebtoken");
const UserModel = require("./User.model");


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

app.post("/login", async (req, res) => {
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
app.use(authenticate)
app.get("/dashboard",(req,res)=>{
  res.json({message:"You can access"})
})


module.exports = app;