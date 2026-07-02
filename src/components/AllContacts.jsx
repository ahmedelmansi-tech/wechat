import { ContactRound } from "lucide-react";
import { useChat } from "../lib/useChat";
import { useEffect } from "react";
import Friend from "./Friend";
const AllContacts = () => {
  const { allContacts, getAllContacts } = useChat();
  useEffect(() => {
    getAllContacts();
  }, []);
  return (
    <div className="space-y-2.5 sm:p-2 p-0.5">
      {allContacts.map((friend) => (
        <Friend friend={friend} key={friend._id} />
      ))}
    </div>
  );
};

export default AllContacts;
