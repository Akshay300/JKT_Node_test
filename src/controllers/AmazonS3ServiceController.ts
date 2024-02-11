import "reflect-metadata";
import { container } from "../container";
import { IAmazonS3Service } from "../services/interfaces/IAmazonS3Service";
import { TYPES } from "../types";
import express from "express";
const router = express.Router();
import { upload } from "../middleware/awsS3Middleware";

const amazonS3Service = container.get<IAmazonS3Service>(TYPES.IAmazonS3Service);

router.post(
  "/createBucket",
  amazonS3Service.createBucket.bind(amazonS3Service)
);

router.put(
  "/putObject",
  upload.single("file"),
  amazonS3Service.putObject.bind(amazonS3Service)
);

router.get("/getObject", amazonS3Service.getObject.bind(amazonS3Service));

router.get("/listBuckets", amazonS3Service.listBuckets.bind(amazonS3Service));

router.get("/listObjects", amazonS3Service.listObjects.bind(amazonS3Service));

router.delete(
  "/deleteObject",
  amazonS3Service.deleteObject.bind(amazonS3Service)
);

export { router };
