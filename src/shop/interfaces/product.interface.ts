import { Document } from 'mongoose';

export interface Product extends Document {
  title: string;
  image: string;
  category: string;
  likes: string[]; // Array of user IDs who have liked the product
}