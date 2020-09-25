import { Document } from "mongoose";

export interface IShortUrl extends Document {
  url: string;
  slug: string;
  count: number;
  active: boolean;
}
