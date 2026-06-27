import { useEffect } from "react";
import { useAuthUser } from "../lib/useAuthUser";
// import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import ChatConversation from "../components/ChatConversation";
const ChatPage = () => {
  const { userAuth } = useAuthUser();
  {
    /* <Nav /> */
  }
  return (
    <div className="h-screen w-screen bg-amber-100 flex justify-center items-center overflow-hidden">
      {/* chat page */}
      <div className=" w-[93%] border-2 bg-slate-200/50 rounded-3xl px-1 pt-5 min-h-200 flex ">
        <SideBar />
        <ChatConversation />
      </div>
    </div>
  );
};

export default ChatPage;
