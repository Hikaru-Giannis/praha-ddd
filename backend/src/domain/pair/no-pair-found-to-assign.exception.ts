import { DomainException } from '../error/domain.exception'

export class NoPairFoundToAssignException extends DomainException {
  constructor(public message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoPairFoundToAssignException)
    }

    this.name = new.target.name
  }
}
