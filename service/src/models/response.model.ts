type ResponseProps<T> = {
  statusCode: number,
  message: string,
  data: T | T[],
};

export class ResponseModel<T> {
  statusCode: number;
  message: string;
  data: T | T[];

  constructor({ statusCode, message, data }: ResponseProps<T>) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    return this;
  }
}