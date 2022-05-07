import express from "express";
import { PrismaFeedbackRepositories } from "./prisma/prismaFeedbacksRepositories";
import { NodemailerMailService } from "./services/nodemailer/nodemailerMailService";
import { CreateFeedbackUseCase } from "./useCases/createFeedbackUseCase";

export const router = express.Router();

router.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepositories = new PrismaFeedbackRepositories();
  const nodemailerMailService = new NodemailerMailService();

  const createFeedbackUseCase = new CreateFeedbackUseCase(
    prismaFeedbackRepositories,
    nodemailerMailService
  );

  try {
    const newFeedback = await createFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });

    return res.status(201).json(newFeedback);
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ message: error.message });
  }
});
