import { MessagesSquare } from "lucide-react";

const ChatConversation = () => {
  return (
    <div className="flex justify-center items-center border-2 w-full rounded-lg">
      <div className="grid grid-cols-2 gap-3.5 items-center">
        <span className="text-4xl font-stretch-125% font-mono">TALK NOW</span>
        <MessagesSquare size={65} />
      </div>
    </div>
  );
};

export default ChatConversation;
