import { GlobeOff } from "lucide-react";
import { useAuthUser } from "../lib/useAuthUser";
import { useChat } from "../lib/useChat";
import Friend from "./Friend";
import { useEffect } from "react";

const ActiveContacts = () => {
  const { onlineUsers, userAuth, activeUsers, updateActiveUsers } =
    useAuthUser();
  const { selectedContact, setSelectedContact } = useChat();

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
  const onLineUsersExept_MeUser = onlineUsers.filter(
    (ids) => ids != userAuth._id,
  );

  useEffect(() => {
    updateActiveUsers(onLineUsersExept_MeUser);
  }, [onlineUsers, userAuth._id]);

  console.log("onLineUsersExept_MeUser: ", onLineUsersExept_MeUser);
  console.log("activeUsers : ", activeUsers);

  if (activeUsers.length === 0) {
    return (
      <div className="w-full h-full flex justify-center pt-8">
        <GlobeOff className="bg-neutral-300 rounded-full p-2" size={35} />
      </div>
    );
  }

  return (
    <>
      {activeUsers.map((user) => (
        <Friend key={user._id} friend={user} />
      ))}
    </>
  );
};

export default ActiveContacts;

// <div
//   className="flex items-center justify-start gap-3 sm:p-2 cursor-pointer mt-2 rounded-lg shadow-xs hover:shadow-2xl "
//   title={user.name}
//   onClick={() => setSelectedContact(user)}
// >
//   <div
//     className={`avatar avatar-${onlineUsers.includes(user._id) ? "online" : "offline"} relative`}
//   >
//     <img
//       src={
//         user.profile_pic ||
//         `https://placehold.co/800x800?text=${user.name.at(0)}`
//       }
//       alt={user.name}
//       className="size-7 sm:size-8 lg:size-10 rounded-full"
//     />
//   </div>

//   {/* @todo make the name ... if it taller than expexted */}
//   <span className="hidden sm:inline text-[10px] sm:text-xs lg:text-xs">
//     {user.name.split(" ")[0]}
//   </span>
// </div>
