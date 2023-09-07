import { DomainException } from '../error/domain.exception'
import { Team } from './team'

export class InvalidTeamException extends DomainException {
  constructor(public message: string, public team: Team) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidTeamException)
    }

    this.name = new.target.name
  }
}
