import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";

import { api } from "../../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";
import { feedbackTypes, IFeedbackType } from "./FeedbackTypeStep";

interface IProps {
  feedbackType: IFeedbackType;
  onClickBackButton: () => void;
  feedbackSent: () => void;
}

export function FeedbackContentStep(props: IProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[props.feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    if (isSendingFeedback) return;

    try {
      setIsSendingFeedback(true);

      await api.post("/feedbacks", {
        type: props.feedbackType,
        screenshot,
        comment,
      });

      props.feedbackSent();
    } catch (error) {
      console.log(error);
    }

    setIsSendingFeedback(false);
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={() => props.onClickBackButton()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[19rem] w-full min-h-[7rem] text-sm 
            placeholder-zinc-400 text-zinc-100 border-zinc-600 
            bg-transparent rounded-md focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none 
            resize-none scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent 
          "
          placeholder="Conte com detalhes o que esta acontecendo..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            setScreenshot={setScreenshot}
          />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent 
              flex-1 flex justify-center items-center text-sm hover:bg-brand-300
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900
              transition-colors disabled:opacity-50 disabled:hover:bg-brand-500
            "
            disabled={comment.length < 5 || isSendingFeedback}
          >
            {isSendingFeedback ? <Loading /> : "Enviar Feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}
