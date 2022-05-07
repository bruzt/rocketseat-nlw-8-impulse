export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailService {
  sendMail: (data: SendMailData) => Promise<void>;
}
