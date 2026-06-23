import { useEffect } from "react";
import { useAuthUser } from "../lib/useAuthUser";
import Nav from "../components/Nav";
const ChatPage = () => {
  const { userAuth } = useAuthUser();
  return (
    <div className="h-screen w-screen bg-amber-500">
      <Nav />
    </div>
  );
};

export default ChatPage;
