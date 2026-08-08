import { useChat } from "../lib/useChat";
import { Users, UserRoundCheck } from "lucide-react";
const ActiveContactsTab = () => {
  const { changeActiveTab, activeTab } = useChat();
  return (
    <div className="mt-2 py-2 border-y-2 sm:border-b-0 flex  flex-col items-center sm:flex-row sm:justify-center sm:items-center sm:gap-2 lg:gap-5 *:border *:rounded-sm *:p-1 *:cursor-pointer  space-y-1.5 sm:space-y-0">
      <button
        className={` ${activeTab === "contacts" && "bg-neutral-400"}`}
        onClick={() => {
          changeActiveTab("contacts");
        }}
      >
        <Users />
      </button>

      <button
        className={` ${activeTab === "active" && "bg-neutral-400"}`}
        onClick={() => {
          changeActiveTab("active");
        }}
      >
        <UserRoundCheck />
      </button>
    </div>
  );
};

export default ActiveContactsTab;
