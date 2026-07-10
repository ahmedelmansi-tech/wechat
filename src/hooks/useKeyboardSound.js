const useKeyboardSound = () => {
  const sounds = [
    new Audio("../public/sounds/frontend_public_sounds_keystroke1.mp3"),
    new Audio("../public/sounds/frontend_public_sounds_keystroke2.mp3"),
  ];

  const makeKeyboardSounds = () => {
    console.log("SOUND SOUND");
  };
  return makeKeyboardSounds;
};

export default useKeyboardSound;
