import { useChat } from "../lib/useChat";
import { MapPinCheckInside } from "lucide-react";
const ActiveContactsTab = () => {
  const { changeActiveTab, activeTab } = useChat();
  return (
    <div className="join grid grid-cols-2 my-4 w-full">
      <button
        className={`join-item btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl ${activeTab === "contacts" && "bg-amber-400"}`}
        onClick={() => {
          changeActiveTab("contacts");
        }}
      >
        {activeTab === "contacts" ? (
          <MapPinCheckInside className="w-3 h-3  sm:w-5 sm:h-5 shrink-0" />
        ) : (
          ""
        )}
        <span>Contacts</span>
      </button>
      <button
        className={`join-item btn btn-outline btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl ${activeTab === "active" && "bg-amber-400"}`}
        onClick={() => changeActiveTab("active")}
      >
        {activeTab === "active" ? (
          <MapPinCheckInside className="w-3 h-3  sm:w-5 sm:h-5 shrink-0" />
        ) : (
          ""
        )}
        <span>Active</span>
      </button>
    </div>
  );
};

export default ActiveContactsTab;
