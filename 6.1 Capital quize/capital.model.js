import mongoose from 'mongoose';

const capitalSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  capital: {
    type: String,
    required: true
  }
});

const Capital = mongoose.model('Capital', capitalSchema);

export default Capital;