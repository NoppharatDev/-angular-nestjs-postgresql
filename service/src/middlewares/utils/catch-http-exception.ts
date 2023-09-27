import { HttpException } from "@nestjs/common";

export class CatchHttpException {
  static process = (error: any) => {
    throw new HttpException({
      status: error.status,
      error: error.error,
      message: error.message,
    }, error.status);
  }
}