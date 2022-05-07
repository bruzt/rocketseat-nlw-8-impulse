import { Feedback } from "@prisma/client";
import { prisma } from "../prisma";

import {
  FeedbackCreateData,
  FeedbacksRepositories,
} from "../repositories/feedbacksRepositories";

export class PrismaFeedbackRepositories
  implements FeedbacksRepositories<Feedback>
{
  create(data: FeedbackCreateData) {
    return prisma.feedback.create({
      data,
    });
  }
}
