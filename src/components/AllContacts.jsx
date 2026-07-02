import { ContactRound } from "lucide-react";
import { useChat } from "../lib/useChat";
import { useEffect } from "react";
import Friend from "./Friend";
const AllContacts = () => {
  const { allContacts, getAllContacts } = useChat();
  useEffect(() => {
    getAllContacts();
  }, []);
  // <div>{allContacts.length > 0 ? "fetching Data" : <ContactRound />}</div>
  return (
    <div className="h-full space-y-2.5  overflow-y-scroll  p-2">
      {allContacts.map((friend) => (
        <Friend friend={friend} key={friend._id} />
      ))}
    </div>
  );
};

export default AllContacts;
