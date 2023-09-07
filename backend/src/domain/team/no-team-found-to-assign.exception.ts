import { DomainException } from '../error/domain.exception'

export class NoTeamFoundToAssignException extends DomainException {
  constructor(public message: string) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoTeamFoundToAssignException)
    }

    this.name = new.target.name
  }
}
