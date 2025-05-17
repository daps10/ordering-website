import mongoose, {Document, Schema} from "mongoose";

export interface IItem extends Document {
  title: string;
  sku: string;
  price: number;
  image: string;
}

const ItemSchema: Schema = new Schema ({
  title: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

export default mongoose.model<IItem>('Item', ItemSchema);