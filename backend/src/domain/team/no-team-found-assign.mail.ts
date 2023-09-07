import { Email } from '../email/email'

export class NoTeamFoundAssignMail extends Email {
  private static readonly TO_ADDRESS: string = 'admin@example.com'
  private static readonly FROM_ADDRESS: string = 'test@example.com'
  private static readonly SUBJECT: string =
    '【重要】チーム割り当てに失敗しました'

  public constructor() {
    super(
      NoTeamFoundAssignMail.TO_ADDRESS,
      NoTeamFoundAssignMail.FROM_ADDRESS,
      NoTeamFoundAssignMail.SUBJECT,
      `
        チーム割り当てに失敗しました。
        管理者にお問い合わせください。
      `,
    )
  }
}
