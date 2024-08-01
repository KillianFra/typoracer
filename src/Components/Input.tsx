import { useEffect, useState } from "react";

export default function Input() {
  const [letter, setLetter] = useState("");

  function handleClick(e: KeyboardEvent) {
    setLetter(letter + e.key);
  }
  useEffect(() => {
    window.addEventListener("keydown", (e) => handleClick(e));

    return () => {
      window.removeEventListener("keydown", (e) => handleClick(e));
    };
  }, []);
  return <></>
}
