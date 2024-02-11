import { Request, Response } from "express";

export interface IAmazonS3Service {
  createBucket(req: Request, res: Response): Promise<Response>;
  putObject(req: Request, res: Response): Promise<Response>;
  getObject(req: Request, res: Response): Promise<Response>;
  listBuckets(req: Request, res: Response): Promise<Response>;
  listObjects(req: Request, res: Response): Promise<Response>;
  deleteObject(req: Request, res: Response): Promise<Response>;
}
