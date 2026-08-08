import { MessagesSquare } from "lucide-react";

const ChatConversation = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 border-2 w-full rounded-lg ">
      <div className="sm:size-25 size-15 bg-base-200 p-5 flex items-center justify-center rounded-full shadow-lg">
        <MessagesSquare className="size-full" />
      </div>

      <p className="sm:text-3xl lg:text-4xl text-sm  font-mono bg-base-200 p-3 rounded-xl">
        Start your Conversation now
      </p>
    </div>
  );
};

export default ChatConversation;
