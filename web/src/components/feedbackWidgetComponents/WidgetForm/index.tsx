import { useState } from "react";

import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";
import { FeedbackTypeStep, IFeedbackType } from "./steps/FeedbackTypeStep";

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<IFeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function restartFeedbackType() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackType == null ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      ) : feedbackSent == false ? (
        <FeedbackContentStep
          feedbackType={feedbackType}
          onClickBackButton={restartFeedbackType}
          feedbackSent={() => setFeedbackSent(true)}
        />
      ) : (
        <FeedbackSuccessStep restartFeedbackType={restartFeedbackType} />
      )}

      <footer className="text-xs text-neutral-400">
        Feito por <span className="underline underline-offset-2">Bruno Z</span>
      </footer>
    </div>
  );
}
