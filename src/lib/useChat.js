import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useChat = create((set, get) => ({
  isSoundEnabled: localStorage.getItem("soundOn") === "true",
  updateSoundStatus: () => {
    localStorage.setItem("soundOn", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  activeTab: localStorage.getItem("activeTab") || "contacts",
  changeActiveTab: (whatActive) => {
    localStorage.setItem("activeTab", whatActive);
    set({ activeTab: whatActive });
  },
  isAllContactsLoading: false,
  allContacts: [],
  getAllContacts: async () => {
    try {
      set({ isAllContactsLoading: true });
      const respons = await axiosInstance.get("/message/getAllCurrentUsers");
      set({ allContacts: [...respons?.data?.data] });
    } catch (error) {
      toast.error("somthing went wrong 😐");
      console.log(error);
    } finally {
      set({ isAllContactsLoading: false });
      console.log("FINALLY", get().allContacts);
    }
  },
}));
