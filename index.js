const express = require("express");
var cors = require('cors')
 


const connect = require(`./configs/db`);
const AppRouter = require(`./features/App/api.router`);


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use("/api", AppRouter);

app.listen(8080, async () => {
  await connect();
  console.log("db started");
  console.log(`server started on port ${8080}`);
});
