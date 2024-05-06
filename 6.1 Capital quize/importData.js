import mongoose from 'mongoose';
import csv from 'csv-parser';
import fs from 'fs';
import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import Capital from './capital.model.js';

dotenv.config();

const importData = async () => {
  await connectDB();

  let results = [];

  fs.createReadStream('capitals.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await Capital.insertMany(results);
        console.log('Data Import Successful');
        mongoose.connection.close();
      } catch (err) {
        console.error('Data Import Failed', err);
        mongoose.connection.close();
      }
    });
};

importData();