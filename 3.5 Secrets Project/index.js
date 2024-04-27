import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirname=dirname(fileURLToPath(import.meta.url));

const port=3000;
var AuthorisedUser=false;

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

function checkPass(req,res,next){
  const password=req.body["password"];
  if(password==="I love codding"){
    AuthorisedUser=true;
  }
  next();

}
app.use(checkPass);


app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/public/index.html");
})

app.post("/check",(req,res)=>{
  if(AuthorisedUser){
    res.sendFile(__dirname+"/public/secret.html");
  } else{
    res.sendFile(__dirname+"/public/index.html");
  }
})

app.listen(port,()=>{
  console.log(`app is listning on port ${port}`);
})


