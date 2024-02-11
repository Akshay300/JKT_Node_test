import mongoose from "mongoose";

const bucketSchema = new mongoose.Schema({
  bucketName: { type: String, unique: true },
  userName: { type: String },
});

export const Bucket = mongoose.model("Bucket", bucketSchema);

const fileSchema = new mongoose.Schema({
  bucketName: { type: String },
  filePath: { type: String },
});

export const File = mongoose.model("File", fileSchema);
