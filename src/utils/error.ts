export class CustomError extends Error {
  constructor(public message: string, public extra?: object) {
    super(message);
  }
}
