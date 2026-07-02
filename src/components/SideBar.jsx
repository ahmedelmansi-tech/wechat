import Profile from "./Profile";
import AllContacts from "./AllContacts";
import ActiveContacts from "./ActiveContacts";
import { useChat } from "../lib/useChat";
const SideBar = () => {
  const { activeTab } = useChat();
  return (
    <div className="h-full flex flex-col">
      <Profile />
      <div className=" max-h-[75%] overflow-y-scroll">
        {activeTab === "contacts" ? <AllContacts /> : <ActiveContacts />}
      </div>
    </div>
  );
};

export default SideBar;
