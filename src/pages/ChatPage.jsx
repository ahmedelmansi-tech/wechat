import { useEffect } from "react";
import { useAuthUser } from "../lib/useAuthUser";
import { useChat } from "../lib/useChat";
import SideBar from "../components/SideBar";
import ChatConversation from "../components/ChatConversation";
import ActiveContactsTab from "../components/ActiveContactsTab";
import SelectedContactChatPage from "../components/SelectedContactChatPage";
const ChatPage = () => {
  const { userAuth } = useAuthUser();
  const { selectedContact } = useChat();

  return (
    <div className="h-screen w-screen bg-amber-500 flex justify-center items-center ">
      {/* chat page */}
      <div className="w-full sm:w-[93%] h-full sm:max-h-150 sm:border-2  rounded-3xl px-1 py-5 min-h-200 flex gap-2">
        <div className="sm:w-[28%] lg:w-[30%] w-[50%]">
          <SideBar />
        </div>
        {selectedContact ? <SelectedContactChatPage /> : <ChatConversation />}
      </div>
    </div>
  );
};

export default ChatPage;
