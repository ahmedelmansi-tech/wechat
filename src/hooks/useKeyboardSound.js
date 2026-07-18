// for optimization useRef to prevent recreate a new Oject
import { useRef } from "react";

const useKeyboardSound = () => {
  const soundOne = useRef(
    new Audio("/sounds/frontend_public_sounds_keystroke1.mp3"),
  );

  const soundTwo = useRef(
    new Audio("/sounds/frontend_public_sounds_keystroke2.mp3"),
  );

  const soundThree = useRef(new Audio("/sounds/keystroke3.mp3"));
  const soundFour = useRef(new Audio("/sounds/keystroke4.mp3"));

  const sounds = [soundOne, soundTwo, soundFour, soundThree];

  const makeKeyboardSounds = () => {
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.current.currentTime = 0;
    randomSound.current.play();
  };
  return { makeKeyboardSounds };
};

export default useKeyboardSound;
