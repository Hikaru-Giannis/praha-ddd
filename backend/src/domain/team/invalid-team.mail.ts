import { Email } from '../email/email'
import { Team } from './team'

export class InvalidTeamMail extends Email {
  private static readonly TO_ADDRESS: string = 'admin@example.com'
  private static readonly FROM_ADDRESS: string = 'test@example.com'
  private static readonly SUBJECT: string = '無効なチームが発生しました'

  public constructor(team: Team) {
    // TODO チーム名の取得の仕方
    const allProps = team.getAllProperties()
    super(
      InvalidTeamMail.TO_ADDRESS,
      InvalidTeamMail.FROM_ADDRESS,
      InvalidTeamMail.SUBJECT,
      `
      <p>無効なチームが発生しました</p>
      <p>チーム名: ${allProps.teamName}</p>
      `,
    )
  }
}
