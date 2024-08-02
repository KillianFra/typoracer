import { useEffect, useState } from "react";
import { getRandomWordsFromFile } from "../Utils/getRandomWordsList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function DisplayText() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState<string[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [done, setDone] = useState<boolean>(false);

  function handleClick(e: KeyboardEvent) {
    if (done) return; // Stop further input if done

    if (!isActive) {
      setIsActive(true);
      setStartTime(Date.now());
    }

    if (e.key === "Backspace") {
      setIndex((prevIndex) => {
        if (prevIndex > 0) {
          const lastLetterElement = document.getElementById(
            `letter-${prevIndex - 1}`
          );
          lastLetterElement?.classList.remove("text-green-500");
          lastLetterElement?.classList.remove("text-red-500");

          const currentLetterElement = document.getElementById(
            `letter-${prevIndex}`
          );
          currentLetterElement?.classList.remove("underline");

          return prevIndex - 1;
        }
        return 0;
      });
      return;
    }

    if (e.key.length === 1) {
      setIndex((prevIndex) => {
        const currentLetterElement = document.getElementById(
          `letter-${prevIndex}`
        );
        if (currentLetterElement) {
          if (currentLetterElement.innerText === e.key) {
            currentLetterElement.classList.add("text-green-500");
          } else {
            currentLetterElement.classList.add("text-red-500");
          }
        }
        console.log();
        if (!document.getElementById(`letter-${prevIndex + 1}`)) {
          setIsActive(false);
          setDone(true);
          return prevIndex;
        }

        return prevIndex + 1;
      });
    }
  }

  function timer() {
    const elapsedTime = Date.now() - startTime;
    setSeconds(Math.floor(elapsedTime / 1000));
    setMilliseconds(elapsedTime % 1000);
  }

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(timer, 10);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  useEffect(() => {
    const contentElement = getRandomWordsFromFile().join(" ").split("");
    setText(contentElement);
  }, []);

  useEffect(() => {
    if (text.length > 0) {
      const currentLetterElement = document.getElementById(`letter-${index}`);
      if (currentLetterElement) {
        currentLetterElement.classList.add("underline");
      }
      const previousLetterElement = document.getElementById(
        `letter-${index - 1}`
      );
      if (previousLetterElement) {
        previousLetterElement.classList.remove("underline");
      }
    }
  }, [index, text]);

  useEffect(() => {
    window.addEventListener("keydown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleClick);
    };
  }, []);

  function calculateWMP() {
    return <div>{(index / 5)} WPM</div>
  }

  return (
    <>
      {done ? (
        <Dialog defaultOpen={true}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>You've done the Typing Test !</DialogTitle>
              <DialogDescription className="text-xl">
                {calculateWMP()}
              </DialogDescription>
              <DialogFooter className="flex justify-between">
                <Button
                  className="rounded-full bg-green-500 text-white font-semibold hover:bg-green-700"
                  onClick={() => {
                    location.reload();
                  }}
                >
                  Try Again
                </Button>
                <DialogClose>
                  <Button
                    className="rounded-full bg-red-500 text-white font-semibold hover:bg-red-700"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}
      <div className="text-white text-2xl">
        {seconds}:{milliseconds}
      </div>
      <div className="flex flex-wrap mx-20 w-9/12 h-1/3 text-3xl font-bold text-slate-200">
        <div id="content">
          {text.map((char, i) => (
            <span id={`letter-${i}`} key={i} className="text-gray-500">
              {char}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
