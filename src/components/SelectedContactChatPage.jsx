import NoChatHistory from "./NoChatHistory";
// import { makeKeyboardSounds } from "../hooks/useKeyboardSound";
import SendMessage from "./SendMessage";
import { useChat } from "../lib/useChat";
import { useAuthUser } from "../lib/useAuthUser";
import { CircleX, RefreshCcw } from "lucide-react";
import { useEffect, useRef } from "react";
function SelectedContactChatPage() {
  const {
    selectedContact,
    setSelectedContact,
    getMessageByUserId,
    messages,
    isMessagesLoading,
    supscripTomessages,
  } = useChat();
  const { userAuth, onlineUsers } = useAuthUser();
  const scrollToMe = useRef(null);

  // Case : handle ESCAPE KEY
  useEffect(() => {
    const handleESCBtn = (e) => {
      if (e.key === "Escape") setSelectedContact(null);
    };
    window.addEventListener("keydown", handleESCBtn);

    return () => window.removeEventListener("keydown", handleESCBtn);
  }, [selectedContact]);

  useEffect(() => {
    // console.log("PAGE LOADED");
    // console.log("CONTACTED - ID", selectedContact._id);
    getMessageByUserId(selectedContact._id);
    supscripTomessages();
    // console.log("MESSAGES > ", messages);
  }, [selectedContact, getMessageByUserId, supscripTomessages]);

  // Scrolling to the last Message
  useEffect(() => {
    console.log("CALLED Scrolling to the last Message");
    scrollToMe.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // border-5
  return (
    <div className="flex flex-col justify-between items-center  flex-1  bg-amber-200">
      <header className=" w-full flex justify-between items-center px-5 py-2">
        <div className="flex gap-1.5">
          <div className="size-10 sm:size-15 lg:size-25 border rounded-full overflow-hidden">
            <img
              src={
                selectedContact.profile_pic ||
                `https://placehold.co/800x800?text=${selectedContact.name.split(" ")[0][0]}`
              }
              alt={selectedContact.name}
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col">
            <p>{selectedContact.name.split(" ")[0]}</p>
            <span
              className={`${onlineUsers.includes(selectedContact._id) ? "text-green-400" : "text-red-600"} sm:text-xs text-[9px]`}
            >
              {onlineUsers.includes(selectedContact._id) ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <div className="cursor-pointer ">
          <CircleX onClick={() => setSelectedContact(null)} />
        </div>
      </header>
      <main className="py-2 flex-1 w-full p-2 overflow-y-auto space-y-2.5">
        {/* Messages are loading */}
        {isMessagesLoading && (
          <div className="w-full h-full flex justify-center items-center">
            <RefreshCcw size={50} className="animate-spin" />
          </div>
        )}

        {/* Messages loaded */}
        {messages.length === 0 ? (
          <NoChatHistory />
        ) : (
          <>
            {messages.map((sms) => {
              return (
                <div
                  className={`chat ${sms.senderId === userAuth._id ? "chat-end" : "chat-start"} `}
                  key={sms._id}
                >
                  <div
                    className={`${sms.senderId === selectedContact._id && "chat-bubble-neutral"} chat-bubble p-3`}
                  >
                    {sms.text && <p>{sms.text}</p>}
                    {sms.image && (
                      <img
                        src={sms.image}
                        alt="message image"
                        className="h-25 rounded-xl object-cover mt-2"
                      />
                    )}
                    <p className="bg-slate-500 w-fit p-1 text-xs mt-2 rounded-lg text-white">
                      {new Date(sms.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        )}
        {/* Scroll to immediatly */}
        <div ref={scrollToMe} />
      </main>
      <SendMessage />
    </div>
  );
}

export default SelectedContactChatPage;
