import { IShortUrl } from "./../types/shortUrl";
import { model, Schema } from "mongoose";
import { boolean } from "yup";

const shortUrlSchema: Schema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    count: {
      type: Number,
      required: false,
      default: 0,
    },

    active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

export default model<IShortUrl>("shortUrl", shortUrlSchema);
