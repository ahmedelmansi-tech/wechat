import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { data } from "react-router-dom";
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

  selectedContact: null,
  setSelectedContact: (selectedContact) => set({ selectedContact }),
  messages: [],
  isMessagesLoading: false,
  getMessageByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(
        `/message/getMessagesWithOtherContact/${userId}`,
      );
      console.log("messages", res?.data?.talks);
      set({ messages: res?.data?.talks });
    } catch (error) {
      toast.error(error?.response?.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
