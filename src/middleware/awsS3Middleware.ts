import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const bucketName = req.body.bucketName;
    const directory = path.join(String(process.env.DIRECTORY_PATH), bucketName);

    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
