//var generateName = require('sillyname');

import generateName from "sillyname";
var sillyName = generateName();

console.log(`my name is ${sillyName}`);
console.log(`hello I am ${sillyName} , I likes Mangoes.`)

// const superheroes = require('superheroes');

import superheroes from 'superheroes';

console.log(`I am a superhero name is ${superheroes.random()}`);
console.log(` the name of my favorite superheros is ${superheroes.random()}`);