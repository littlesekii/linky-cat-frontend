export class ApiError extends Error {
  status: number;
  errorCode: string;
  message: string;

  constructor(status: number, errorCode: string, message: string) {
    super(message);
    this.status = status;
    this.errorCode = errorCode;
    this.message = message;
  }
}
