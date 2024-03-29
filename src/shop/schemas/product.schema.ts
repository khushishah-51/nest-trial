import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
});

export interface Product extends mongoose.Document {
  title: string;
  image: string;
  category: string;
}