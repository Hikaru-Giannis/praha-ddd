import { DomainValidationError } from '../error/domain-validation.error'

export const PARTICIPANT_STATUS = {
  PARTICIPATING: 'participating',
  ADJOURNING: 'adjourning',
  WITHDRAWN: 'withdrawn',
} as const

export type ParticipantStatusType = typeof PARTICIPANT_STATUS[keyof typeof PARTICIPANT_STATUS]

export class ParticipantStatus {
  public readonly value: ParticipantStatusType
  public constructor(value: ParticipantStatusType) {
    if (!Object.values(PARTICIPANT_STATUS).includes(value)) {
      throw new DomainValidationError('異常な状態値です。')
    }
    this.value = value
  }

  public static participating(): ParticipantStatus {
    return new ParticipantStatus(PARTICIPANT_STATUS.PARTICIPATING)
  }

  public static adjourning(): ParticipantStatus {
    return new ParticipantStatus(PARTICIPANT_STATUS.ADJOURNING)
  }

  public static withdrawn(): ParticipantStatus {
    return new ParticipantStatus(PARTICIPANT_STATUS.WITHDRAWN)
  }

  public get isParticipating(): boolean {
    return this.value === PARTICIPANT_STATUS.PARTICIPATING
  }

  public get isAdjourning(): boolean {
    return this.value === PARTICIPANT_STATUS.ADJOURNING
  }

  public get isWithdrawn(): boolean {
    return this.value === PARTICIPANT_STATUS.WITHDRAWN
  }
}
