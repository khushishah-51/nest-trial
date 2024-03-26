// auth.schema.ts

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

// export interface User extends mongoose.Document {
//   name: string;
//   password: string;
//   isAdmin: boolean;
// }
