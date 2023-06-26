// import { TeamStatus, TeamStatusType, TEAM_STATUS } from './TeamStatus'

import { TeamStatus } from '../TeamStatus'

describe('TeamStatus', () => {
  it('活性化状態を生成できるか', () => {
    const activeStatus = TeamStatus.active()
    expect(activeStatus.value).toBe('active')
  })

  it('非活性化状態を生成できるか', () => {
    const inactiveStatus = TeamStatus.inactive()
    expect(inactiveStatus.value).toBe('inactive')
  })

  it('解散状態かどうか', () => {
    const disbandedStatus = TeamStatus.disbanded()
    expect(disbandedStatus.value).toBe('disbanded')
  })

  it('活性化状態を正しく比較できるか', () => {
    const activeStatus = TeamStatus.active()
    expect(activeStatus.isActive).toBe(true)
    expect(activeStatus.isInactive).toBe(false)
    expect(activeStatus.isDisbanded).toBe(false)
  })

  it('非活性化状態を正しく比較できるか', () => {
    const inactiveStatus = TeamStatus.inactive()
    expect(inactiveStatus.isActive).toBe(false)
    expect(inactiveStatus.isInactive).toBe(true)
    expect(inactiveStatus.isDisbanded).toBe(false)
  })

  it('解散状態を正しく比較できるか', () => {
    const disbandedStatus = TeamStatus.disbanded()
    expect(disbandedStatus.isActive).toBe(false)
    expect(disbandedStatus.isInactive).toBe(false)
    expect(disbandedStatus.isDisbanded).toBe(true)
  })
})
