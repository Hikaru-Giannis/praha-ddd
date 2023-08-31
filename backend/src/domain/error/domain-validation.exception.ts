import { DomainException } from './domain.exception'

export class DomainValidationException extends DomainException {
  constructor(public message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DomainValidationException)
    }

    this.name = new.target.name
  }
}
