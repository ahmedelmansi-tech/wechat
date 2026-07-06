import { useChat } from "../lib/useChat";
const Friend = ({ friend }) => {
  const { setSelectedContact, getMessageByUserId } = useChat();

  return (
    <div
      className="bg-slate-200 flex gap-2.5 items-center w-full p-2 cursor-pointer mt-2 rounded-lg shadow-xs hover:shadow-2xl"
      title={friend.name}
      onClick={() => setSelectedContact(friend)}
    >
      <img
        src={
          friend.profile_pic ||
          `https://placehold.co/800x800?text=${friend.name.at(0)}`
        }
        alt={friend.name}
        className="size-6 sm:size-8 lg:size-10 rounded-full"
      />

      {/* @todo make the name ... if it taller than expexted */}

      <span className="text-[10px] sm:text-xs lg:text-xl">
        {friend.name.split(" ")[0]}
      </span>
    </div>
  );
};

export default Friend;
