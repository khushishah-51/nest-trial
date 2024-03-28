import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: String,
});

// export interface Category extends mongoose.Document {
//   name: string;
// }