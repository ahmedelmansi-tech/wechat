import { Send, Image } from "lucide-react";
import { useRef } from "react";
const SendMessage = () => {
  const fileImageRef = useRef(null);
  return (
    <form className="flex justify-between py-2.5 px-3  w-full gap-4 items-center">
      <input
        type="text"
        placeholder="type your message ... "
        className="flex-1 h-full border-0 outline-0 placeholder-white placeholder:text-lg placeholder:font-mono"
      />
      <div className="flex space-x-2 *:border *:size-10 *:rounded-sm">
        <div
          className="flex justify-center items-center"
          onClick={() => fileImageRef.current.click()}
        >
          <input type="file" accept="image/*" hidden ref={fileImageRef} />
          <Image />
        </div>
        <button className=" flex justify-center items-center">
          <Send />
        </button>
      </div>
    </form>
  );
};

export default SendMessage;
