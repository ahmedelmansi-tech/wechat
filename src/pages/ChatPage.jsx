import { useEffect } from "react";
import { useAuthUser } from "../lib/useAuthUser";
// import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import ChatConversation from "../components/ChatConversation";
import ActiveContactsTab from "../components/ActiveContactsTab";
const ChatPage = () => {
  const { userAuth } = useAuthUser();
  {
    /* <Nav /> */
  }
  return (
    <div className="h-screen w-screen bg-amber-200 flex justify-center items-center ">
      {/* chat page */}
      <div className="w-full sm:w-[93%] h-full sm:max-h-150 sm:border-2  rounded-3xl px-1 py-5 min-h-200 flex gap-2">
        <div className="sm:w-[28%] lg:w-[30%] w-[30%]">
          <SideBar />
        </div>
        <ChatConversation />
      </div>
    </div>
  );
};

export default ChatPage;
