import { Container } from "inversify";
import { IAmazonS3Service } from "./services/interfaces/IAmazonS3Service";
import { AmazonS3ServiceImpl } from "./services/AmazonS3ServiceImpl";
import { TYPES } from "./types";

const container = new Container();

container
  .bind<IAmazonS3Service>(TYPES.IAmazonS3Service)
  .to(AmazonS3ServiceImpl);

export { container };
