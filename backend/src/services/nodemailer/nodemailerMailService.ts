import nodemailer from "nodemailer";

import { MailService, SendMailData } from "../mailService";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "82763040bfd3c8",
    pass: "118eaa31afaeb5",
  },
});

export class NodemailerMailService implements MailService {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@Feedget.com>",
      to: "Dono do Site <donodosite@site.com>",
      subject,
      html: body,
    });
  }
}
