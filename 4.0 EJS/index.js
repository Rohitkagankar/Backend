import express from "express";

const port=3000;

const app=express();

app.get("/",(req,res)=>{
    const today=new Date();
    const day = today.getDay();

    let type="a weekday";
    let adv="Its time to work hard.";

    if(day===0 || day===6){
        type="a weekend";
        adv="Its time to fun";
    }
    
    res.render("solution.ejs",{
        dayType: type,
        advice: adv,
        day:day
    });
});

app.listen(port,()=>{
    console.log(`app is listning on port ${port}`);
})