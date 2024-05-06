//require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import bodyParser from "body-parser";
import express from "express";
import Capital from './capital.model.js';




dotenv.config({
    port: './env'
})

connectDB();
const app = express();
const port = process.env.PORT || 3000;


let quiz = [];
let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
// app.get("/", async (req, res) => {
//   totalCorrect = 0;
//   await nextQuestion();
//   console.log(currentQuestion);
//   res.render("index.ejs", { question: currentQuestion });
// });
app.get("/", async (req, res) => {
    try {
        const count = await Capital.countDocuments();
        const random = Math.floor(Math.random() * count);
        const question = await Capital.findOne().skip(random);
        res.render("index.ejs", { question });
    } catch (error) {
        console.error("Failed to retrieve question:", error);
        res.status(500).send("Error getting question from the database");
    }
});

// POST a new post
// app.post("/submit", (req, res) => {
//   let answer = req.body.answer.trim();
//   let isCorrect = false;
//   if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
//     totalCorrect++;
//     console.log(totalCorrect);
//     isCorrect = true;
//   }

//   nextQuestion();
//   res.render("index.ejs", {
//     question: currentQuestion,
//     wasCorrect: isCorrect,
//     totalScore: totalCorrect,
//   });
// });

app.post("/submit", async (req, res) => {
    const { country, answer } = req.body;
    try {
        const capital = await Capital.findOne({ country });
        const isCorrect = capital.capital.toLowerCase() === answer.trim().toLowerCase();
        res.render("index", { 
            question: await nextQuestion(), 
            lastAnswer: answer,
            isCorrect 
        });
    } catch (error) {
        console.error("Error validating answer:", error);
        res.status(500).send("Error validating answer");
    }
});

// async function nextQuestion() {
//     const count = await Capital.countDocuments();
//     const random = Math.floor(Math.random() * count);
//     currentQuestion = await Capital.findOne().skip(random);
// }

async function nextQuestion() {
    const count = await Capital.countDocuments();
    const random = Math.floor(Math.random() * count);
    return Capital.findOne().skip(random);
}


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
