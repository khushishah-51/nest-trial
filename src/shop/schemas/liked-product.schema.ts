import * as mongoose from 'mongoose';

export const LikedProductSchema = new mongoose.Schema({
  productId: String,
  userId: String, // Assuming each like is associated with a user
});

export interface LikedProduct extends mongoose.Document {
  productId: string;
  userId: string;
}