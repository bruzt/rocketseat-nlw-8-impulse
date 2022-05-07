import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { Loading } from "../Loading";

interface IProps {
  screenshot: string | null;
  setScreenshot: (screenshot: string | null) => void;
}

export function ScreenshotButton(props: IProps) {
  const [isTakingScreenshot, setTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector("html")!);

    const base64Image = canvas.toDataURL("image/png");

    props.setScreenshot(base64Image);

    setTakingScreenshot(false);
  }

  if (props.screenshot)
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end
            text-zinc-400 hover:text-zinc-100 transition-colors
        "
        onClick={() => props.setScreenshot(null)}
        style={{
          backgroundImage: `url(${props.screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );

  return (
    <button
      type="button"
      className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md border-transparent 
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors
      "
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
