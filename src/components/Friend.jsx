import { useChat } from "../lib/useChat";
import { useAuthUser } from "../lib/useAuthUser";
const Friend = ({ friend }) => {
  const { setSelectedContact, getMessageByUserId } = useChat();
  const { onlineUsers } = useAuthUser();

  return (
    <div
      className="flex items-center justify-start gap-3 sm:p-2 cursor-pointer mt-2 rounded-lg shadow-xs hover:shadow-2xl pl-1.5"
      title={friend.name}
      onClick={() => setSelectedContact(friend)}
    >
      <div
        className={`avatar avatar-${onlineUsers.includes(friend._id) ? "online" : "offline"} relative`}
      >
        <img
          src={
            friend.profile_pic ||
            `https://placehold.co/800x800?text=${friend.name.at(0)}`
          }
          alt={friend.name}
          className="size-5 sm:size-8 lg:size-10 rounded-full"
        />
      </div>

      <span className="hidden sm:inline text-[10px] sm:text-xs lg:text-xs">
        {friend.name.split(" ")[0]}
      </span>
    </div>
  );
};

export default Friend;
