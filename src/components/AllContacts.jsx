import { ContactRound } from "lucide-react";
import { useChat } from "../lib/useChat";
import { useEffect } from "react";
import FriendSkelton from "./FriendSkelton";

import Friend from "./Friend";
const AllContacts = () => {
  const { allContacts, getAllContacts, isAllContactsLoading } = useChat();
  useEffect(() => {
    getAllContacts();
  }, []);

  if (isAllContactsLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => {
          return <FriendSkelton key={i} />;
        })}
      </>
    );
  }

  return (
    <div className="mt-6 px-1.5 h-full py-2">
      {allContacts.map((friend) => (
        <Friend friend={friend} key={friend._id} />
      ))}
    </div>
  );
};

export default AllContacts;
