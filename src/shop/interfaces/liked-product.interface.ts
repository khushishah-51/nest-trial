import { Document } from 'mongoose';

export interface LikedProduct extends Document {
  productId: string;
  userId: string;
}