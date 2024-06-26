import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});