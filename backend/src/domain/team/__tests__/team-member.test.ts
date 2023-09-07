import { ParticipantId } from 'src/domain/participant/ParticipantId'
import { createRandomIdString } from 'src/util/random'
import { TeamMember } from '../team-member'

describe('TeamMember', () => {
  it('正常にチームメンバーを生成できるか', () => {
    const participantId = new ParticipantId(createRandomIdString())
    const teamMember = TeamMember.create({ participantId })

    expect(teamMember).toBeInstanceOf(TeamMember)
    expect(teamMember.participantId).toBe(participantId)
  })

  it('正常にチームメンバーを再構築できるか', () => {
    const props = {
      id: createRandomIdString(),
      participantId: createRandomIdString(),
    }

    const teamMember = TeamMember.reconstruct(props)

    expect(teamMember).toBeInstanceOf(TeamMember)
    expect(teamMember.id.value).toBe(props.id)
    expect(teamMember.participantId).toEqual(
      new ParticipantId(props.participantId),
    )
  })

  it('正しく比較ができているか', () => {
    const participantId1 = new ParticipantId(createRandomIdString())
    const participantId2 = new ParticipantId(createRandomIdString())
    const teamMember1 = TeamMember.create({ participantId: participantId1 })
    const teamMember2 = TeamMember.create({ participantId: participantId2 })

    expect(teamMember1.equals(participantId1)).toBe(true)
    expect(teamMember2.equals(participantId1)).toBe(false)
  })

  it('正常に全てのプロパティを返しているか', () => {
    const participantId = new ParticipantId(createRandomIdString())
    const teamMember = TeamMember.create({ participantId })

    const properties = teamMember.getAllProperties
    expect(properties.id).toBe(teamMember.id.value)
    expect(properties.participantId).toBe(teamMember.participantId.value)
  })
})
