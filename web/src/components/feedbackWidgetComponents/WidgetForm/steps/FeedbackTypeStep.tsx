import bugImg from "../../../../assets/bug.svg";
import ideaImg from "../../../../assets/idea.svg";
import thoughtImg from "../../../../assets/thought.svg";
import { CloseButton } from "../../CloseButton";

export const feedbackTypes = {
  BUG: {
    title: "Probrema",
    image: {
      source: bugImg,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImg,
      alt: "Imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImg,
      alt: "Imagem de uma nuvem de pensamento",
    },
  },
};

export type IFeedbackType = keyof typeof feedbackTypes;

interface IProps {
  onFeedbackTypeChanged: React.Dispatch<IFeedbackType>;
}

export function FeedbackTypeStep(props: IProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu Feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <button
            key={key}
            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 
            flex flex-col items-center gap-2 
            border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none
            "
            onClick={() => props.onFeedbackTypeChanged(key as IFeedbackType)}
          >
            <img src={value.image.source} alt={value.image.alt} />
            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
