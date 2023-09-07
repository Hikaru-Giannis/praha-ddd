export class Email {
  constructor(
    public readonly email: string,
    public readonly fromAddress: string,
    public readonly subject: string,
    public readonly body: string,
  ) {}
}
