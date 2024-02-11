import { Request, Response } from "express";
import { IAmazonS3Service } from "./interfaces/IAmazonS3Service";
import { injectable } from "inversify";
import fs from "fs";
import path from "path";
import { Bucket, File } from "../models/dataModel";

@injectable()
export class AmazonS3ServiceImpl implements IAmazonS3Service {
  async createBucket(req: Request, res: Response): Promise<Response> {
    const { bucketName, userName } = req.body;

    const bucketExists = await Bucket.findOne({ bucketName: bucketName });

    if (bucketExists) {
      return res.status(409).json({ error: "Bucket already exists" });
    }

    try {
      // Create the folder by bucketName in the specified path
      const folderPath = path.join(
        String(process.env.DIRECTORY_PATH),
        bucketName
      );
      fs.mkdirSync(folderPath, { recursive: true });

      // Create the bucket object
      const bucket = await Bucket.create({ bucketName, userName });

      return res
        .status(201)
        .json({ message: "Bucket created successfully", bucket });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create bucket", err });
    }
  }

  async putObject(req: Request, res: Response): Promise<Response> {
    const { bucketName } = req.body;

    const fileData = await File.create({
      bucketName: bucketName,
      filePath: req.file?.path,
    });

    return res.json({ message: "Uploaded Successfully!!!", fileData });
  }

  async getObject(req: Request, res: Response): Promise<Response> {
    const id = req.query.id as string;

    const data = await File.findOne({ _id: id });

    if (!data) {
      return res.status(400).json({ message: "File does not exists!!!" });
    }

    const filePath = data?.filePath;

    // Read file as binary buffer
    const fileBuffer = fs.readFileSync(String(filePath));

    // Convert buffer to byte array
    const byteArray = Array.from(fileBuffer);

    const fileName = path.basename(String(filePath));

    return res.json({
      message: "Got the file Successfully!!!",
      fileName,
      byteArray,
    });
  }

  async listBuckets(req: Request, res: Response): Promise<Response> {
    const userName = req.query.userName as string;

    const buckets = await Bucket.find({ userName: userName });

    return res.json({ message: "List of Buckets", buckets });
  }

  async listObjects(req: Request, res: Response): Promise<Response> {
    const userName = req.query.userName as string;

    const buckets = await Bucket.find({ userName: userName });

    let listOfBuckets = buckets.map((bucket) => ({
      ...bucket.toObject(),
      files: [{}],
    }));

    for (let i = 0; i < listOfBuckets.length; i++) {
      const filesData = await File.find({
        bucketName: listOfBuckets[i].bucketName,
      });

      const filesInfo = filesData.map(({ _id, filePath }) => ({
        _id,
        filePath,
      }));

      listOfBuckets[i].files = filesInfo;
    }

    return res.json({ message: "List of Objects", listOfBuckets });
  }

  async deleteObject(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.id;

      const fileObj = await File.findOne({ _id: id });

      const filePath = fileObj?.filePath;

      if (!filePath) {
        return res.json({ message: "File not found!!!!" });
      }

      fs.unlink(filePath, async (err) => {
        if (err) {
          return res
            .status(500)
            .send("Error deleting file from the file location");
        }

        //delete file from the database
        var fileDeleted = await File.deleteOne({ _id: id });

        if (!fileDeleted) {
          return res.json({
            message: "File is not deleted from the database!!!",
          });
        }
      });

      return res.status(200).json({ message: "File is deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
