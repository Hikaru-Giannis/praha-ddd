import { Email } from '../email/email'

export class NoPairFoundAssignMail extends Email {
  private static readonly TO_ADDRESS: string = 'admin@example.com'
  private static readonly FROM_ADDRESS: string = 'test@example.com'
  private static readonly SUBJECT: string = '【重要】ペア割り当てに失敗しました'

  public constructor() {
    super(
      NoPairFoundAssignMail.TO_ADDRESS,
      NoPairFoundAssignMail.FROM_ADDRESS,
      NoPairFoundAssignMail.SUBJECT,
      `
        ペア割り当てに失敗しました。
        管理者にお問い合わせください。
      `,
    )
  }
}
