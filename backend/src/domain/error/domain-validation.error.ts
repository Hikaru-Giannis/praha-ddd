export class DomainValidationError extends Error {
  constructor(public message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainValidationError)
    }

    this.name = new.target.name
  }
}
