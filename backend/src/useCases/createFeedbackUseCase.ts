import { FeedbacksRepositories } from "../repositories/feedbacksRepositories";
import { MailService } from "../services/mailService";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class CreateFeedbackUseCase {
  private feedbacksRepository: FeedbacksRepositories<any>;
  private mailService: MailService;

  constructor(
    feedbacksRepository: FeedbacksRepositories<any>,
    mailService: MailService
  ) {
    this.feedbacksRepository = feedbacksRepository;
    this.mailService = mailService;
  }

  async execute({ type, comment, screenshot }: SubmitFeedbackUseCaseRequest) {
    if (!type) throw new Error("Type is required.");
    if (!comment) throw new Error("Comment is required.");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    const body = [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      screenshot && `<img src="${screenshot}"}" />`,
      "</div>",
    ].join("\n");

    await this.mailService.sendMail({ subject: "send", body });

    return feedback;
  }
}
