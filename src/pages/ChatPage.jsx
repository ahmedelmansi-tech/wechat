import { useEffect } from "react";
import { toast } from "react-hot-toast";
const ChatPage = () => {
  const handleClick = async () => {
    const abort = new AbortController();
    console.log("CLICK");
    fetch(
      "/api/v1/try",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Ahmed",
          email: "ahmed@911.com",
          password: "xxxxx",
          confirm_password: "xxxxx",
        }),
      },
      {
        signal: abort.signal,
      },
    );
  };

  // useEffect(() => {
  //   toast.success("Hi Body ^**^", {
  //     duration: 2000,
  //     position: "top-right",
  //     // style: "width:120px",
  //     icon: "👏",
  //   });
  // }, []);

  return (
    <div className="flex h-screen w-screen  text-7xl justify-center items-center">
      CHAT PAGE
      <button className="border p-5 m-2 rounded-xl" onClick={handleClick}>
        CLICK
      </button>
    </div>
  );
};

export default ChatPage;
