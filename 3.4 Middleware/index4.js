import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var bname="";
var Name="";
var age;

app.use(bodyParser.urlencoded({extended:true}));

function NamePetGen(req,res,next){
  console.log(req.body);
  bname=req.body["street"]+req.body["pet"];
  next();
}
app.use(NamePetGen);

function nameGen(req,res,next){
  console.log(req.body);
  Name=req.body["name"];
  age=req.body["age"];
  next();
}
app.use(nameGen);

app.get("/", (req, res) => {
  res.sendFile(__dirname+"/public/index.html");
});

app.post("/submit",(req,res)=>{
  res.send(`<h1>Your name is ${bname}</h1>`);
})

app.get("/registerpage",(req,res)=>{
  res.sendFile(__dirname+"/public/page.html");
})

app.post("/register",(req,res)=>{
  res.send(`<h1>Your name is ${Name}</h1><br><h2>Age : ${age}</h2>`)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});