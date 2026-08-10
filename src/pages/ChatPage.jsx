import { useEffect, useState } from "react";
import { useAuthUser } from "../lib/useAuthUser";
import { useChat } from "../lib/useChat";
import SideBar from "../components/SideBar";
import ChatConversation from "../components/ChatConversation";
import ActiveContactsTab from "../components/ActiveContactsTab";
import SelectedContactChatPage from "../components/SelectedContactChatPage";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const ChatPage = () => {
  const { userAuth } = useAuthUser();
  const { selectedContact } = useChat();
  const { width, height } = useWindowSize();
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcome(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-screen">
      <div className="h-full px-1 py-5 flex gap-2 bg-yellow-400/50">
        <SideBar />
        {selectedContact ? <SelectedContactChatPage /> : <ChatConversation />}
      </div>
      {welcome && <Confetti width={width} height={height} recycle={false} />}
    </div>
  );
};

export default ChatPage;
