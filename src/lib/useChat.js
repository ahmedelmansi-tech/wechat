import { create } from "zustand";

export const useChat = create((set, get) => ({
  isSoundEnabled: true,
  updateSoundStatus: () => {
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
}));
