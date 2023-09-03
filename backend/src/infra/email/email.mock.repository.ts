import { Email } from 'src/domain/email/email'
import { EmailSender } from 'src/domain/email/email-sender'

export class EmailMockSender implements EmailSender {
  async send(email: Email): Promise<void> {
    console.log('Email sent:', email)
  }
}
