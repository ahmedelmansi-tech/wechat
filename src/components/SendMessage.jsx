import { Send, Image, BadgeX } from "lucide-react";
import { useChat } from "../lib/useChat";
import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
const SendMessage = () => {
  const fileImageRef = useRef("");
  const [imageThum, setImageThum] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [textMessage, setTextMessage] = useState("");
  const { sendMessageToUser, isSoundEnabled } = useChat();
  const { makeKeyboardSounds } = useKeyboardSound();

  const handleImageChange = (e) => {
    const imageReader = new FileReader();
    const image = e.target.files[0];
    if (!image) return;
    imageReader.onloadend = () => {
      setImageThum(imageReader.result);
    };
    setSelectedImage(image);
    imageReader.readAsDataURL(image);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!textMessage.trim() && !imageThum) return;
    const newMessage = new FormData();
    newMessage.append("text", textMessage);
    if (selectedImage) {
      newMessage.append("image", selectedImage);
    }
    sendMessageToUser(newMessage);
    setTextMessage("");
    setImageThum(null);
    fileImageRef.current.value = null;
  };

  return (
    <form
      className="flex justify-between py-2.5 px-3  w-full gap-4 items-center border-2 relative"
      onSubmit={handleSendMessage}
    >
      <input
        type="text"
        placeholder="type your message ... "
        className="flex-1 h-full border-0 outline-0 placeholder-white placeholder:text-lg placeholder:font-mono"
        value={textMessage}
        onChange={(e) => {
          setTextMessage(e.target.value);
          isSoundEnabled && makeKeyboardSounds();
        }}
      />
      <div className="flex space-x-2 *:border *:size-10 *:rounded-sm">
        <div
          className="flex justify-center items-center"
          onClick={() => fileImageRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileImageRef}
            onChange={(e) => {
              handleImageChange(e);
              makeKeyboardSounds();
            }}
          />
          <Image />
        </div>
        <button className=" flex justify-center items-center">
          <Send />
        </button>
      </div>
      {imageThum && (
        <div className="absolute  min-h-10 bg-slate-500/50 bottom-full left-0 p-1">
          <img src={imageThum} alt="IMAGE" className="size-18 object-cover" />

          <BadgeX
            size={20}
            onClick={() => {
              setImageThum(null);
              fileImageRef.current.value = "";
            }}
            className="absolute top-0.5 right-0.5 text-red-500 cursor-pointer"
          />
        </div>
      )}
    </form>
  );
};

export default SendMessage;
