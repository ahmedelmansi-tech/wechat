import { MessagesSquare } from "lucide-react";

const ChatConversation = () => {
  return (
    <div className="flex justify-center items-center border-2 w-full rounded-lg p-3 sm:p-4 xl:p-6">
      <div className="grid grid-cols-1 gap-5 items-center justify-center p-1">
        <div className="sm:size-25 size-19 bg-amber-100 p-5 flex items-center rounded-full shadow-lg">
          <MessagesSquare className="sm:h-20 sm:w-20  size-full" />
        </div>

        <p className="sm:text-3xl lg:text-4xl text-2xl  font-mono bg-amber-100 p-3 rounded-xl">
          Start your Conversation now
        </p>
      </div>
    </div>
  );
};

export default ChatConversation;
