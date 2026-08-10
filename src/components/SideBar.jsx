import Profile from "./Profile";
import AllContacts from "./AllContacts";
import ActiveContacts from "./ActiveContacts";
import ActiveContactsTab from "./ActiveContactsTab";
import { useChat } from "../lib/useChat";
const SideBar = () => {
  const { activeTab } = useChat();
  return (
    <div className="h-full flex flex-col  sm:p-1">
      <Profile />
      <ActiveContactsTab />
      <div className="flex-1  overflow-y-auto border-b-2 scrollbar-thin">
        {activeTab === "contacts" ? <AllContacts /> : <ActiveContacts />}
      </div>
    </div>
  );
};

export default SideBar;
