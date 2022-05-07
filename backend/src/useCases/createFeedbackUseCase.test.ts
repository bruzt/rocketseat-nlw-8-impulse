import { CreateFeedbackUseCase } from "./createFeedbackUseCase";

const createSpie = jest.fn();
const sendMailSpie = jest.fn();

const createFeedback = new CreateFeedbackUseCase(
  { create: createSpie },
  { sendMail: sendMailSpie }
);

describe("Create Feedback Test Suit", () => {
  it("should be able to create a feedback", async () => {
    await expect(
      createFeedback.execute({
        type: "BUG",
        comment: "test",
        screenshot: "data:image/png;base64;a84sva48v4as8v48av",
      })
    ).resolves.not.toThrow();

    expect(createSpie).toHaveBeenCalled();
    expect(sendMailSpie).toHaveBeenCalled();
  });

  it("should not be able to create a feedback without a type", async () => {
    await expect(
      createFeedback.execute({
        type: "",
        comment: "test",
        screenshot: "data:image/png;base64;a84sva48v4as8v48av",
      })
    ).rejects.toThrow();
  });

  it("should not be able to create a feedback without a comment", async () => {
    await expect(
      createFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64;a84sva48v4as8v48av",
      })
    ).rejects.toThrow();
  });

  it("should not be able to create a feedback with invalid screenshot", async () => {
    await expect(
      createFeedback.execute({
        type: "BUG",
        comment: "test",
        screenshot: "a84sva48v4as8v48av",
      })
    ).rejects.toThrow();
  });
});
