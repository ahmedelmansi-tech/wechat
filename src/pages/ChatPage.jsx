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
    <div className="h-screen">
      <div className="h-full px-1 py-5 flex gap-2 bg-yellow-400/50">
        <SideBar />
        {selectedContact ? <SelectedContactChatPage /> : <ChatConversation />}
      </div>
    </div>
  );
};

export default ChatPage;
