import { DomainException } from 'src/domain/error/domain.exception'
import { PARTICIPANT_STATUS } from '../ParticipantStatus'
import { Participant } from '../participant'

describe('Participant', () => {
  const createProps = {
    name: 'Test Participant',
    email: 'test@test.com',
  }

  const reconstructProps = {
    id: '01F8MECHZX3TBDSZ7STCF8BCRX',
    name: 'Reconstructed Participant',
    email: 'reconstructed@test.com',
    status: PARTICIPANT_STATUS.PARTICIPATING,
  }

  it('参加者を正常に作成できるか', () => {
    const participant = Participant.create(createProps)
    const allProps = participant.getAllProperties()
    expect(allProps.name).toBe(createProps.name)
    expect(allProps.email).toBe(createProps.email)
    expect(allProps.status).toBe(PARTICIPANT_STATUS.PARTICIPATING)
  })

  it('参加者を再構築できるか', () => {
    const participant = Participant.reconstruct(reconstructProps)
    const allProps = participant.getAllProperties()
    expect(allProps.id).toBe(reconstructProps.id)
    expect(allProps.name).toBe(reconstructProps.name)
    expect(allProps.email).toBe(reconstructProps.email)
    expect(allProps.status).toBe(reconstructProps.status)
  })

  it('参加者のステータスを変更できるか', () => {
    const participant = Participant.create(createProps)
    const adjournedParticipant = participant.changeStatus(
      PARTICIPANT_STATUS.ADJOURNING,
    )
    const allProps = adjournedParticipant.getAllProperties()
    expect(allProps.status).toBe(PARTICIPANT_STATUS.ADJOURNING)
  })

  it('参加者で同じ状態であればステータスを変更できないか', () => {
    const participant = Participant.create(createProps)
    expect(() => {
      participant.changeStatus(PARTICIPANT_STATUS.PARTICIPATING)
    }).toThrow(DomainException)
    expect(() => {
      participant.changeStatus(PARTICIPANT_STATUS.PARTICIPATING)
    }).toThrow('同じ状態に変更することはできません')
  })

  it('退会済みの参加者はステータスを変更できないか', () => {
    const participant = Participant.create(createProps)
    const withdrawnParticipant = participant.changeStatus(
      PARTICIPANT_STATUS.WITHDRAWN,
    )
    expect(() => {
      withdrawnParticipant.changeStatus(PARTICIPANT_STATUS.PARTICIPATING)
    }).toThrow(DomainException)
    expect(() => {
      withdrawnParticipant.changeStatus(PARTICIPANT_STATUS.PARTICIPATING)
    }).toThrow('既に退会済みです')
  })
})
