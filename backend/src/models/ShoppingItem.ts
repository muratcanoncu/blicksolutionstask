import { Schema, model, Document } from "mongoose";

export interface IShoppingItem extends Document {
  name: string;
  nameKey: string // extra field for case-sensitive validation for unique names
  bought: boolean;
  createdAt: Date;
}

const ShoppingItemSchema = new Schema<IShoppingItem>({
  name: { type: String, required: [true, "Product must have a name"], unique: true },
  nameKey: { type: String, required: true, unique: true },
  bought: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default model<IShoppingItem>("ShoppingItem", ShoppingItemSchema);