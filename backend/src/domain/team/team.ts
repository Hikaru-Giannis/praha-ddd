type createTeamProps = {
  id: string
  name: string
  status: 'active' | 'inactive' | 'disbanded'
}

export class Team {
  private readonly id: string
  private readonly name: string
  private readonly status: 'active' | 'inactive' | 'disbanded'
  private constructor(
    id: string,
    name: string,
    status: 'active' | 'inactive' | 'disbanded',
  ) {
    this.id = id
    // 名前は数字のみ
    if (!name.match(/^[0-9]+$/)) {
      throw new Error('名前は数字のみです')
    }
    // 名前は3文字以下
    if (name.length > 3) {
      throw new Error('名前は3文字以下です')
    }
    this.name = name
    this.status = status
  }

  static create({ id, name, status }: createTeamProps) {
    return new Team(id, name, status)
  }
}
