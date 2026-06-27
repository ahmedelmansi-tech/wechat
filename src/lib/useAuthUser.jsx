import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthUser = create((set) => ({
  userAuth: null,
  checkUserAuth: true,
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false,
  isUploadingProfilePic: false,

  checkCapility: async () => {
    try {
      const res = await axiosInstance.get("/users/check");
      set({ userAuth: res.data.user });
    } catch (error) {
      console.log("ERR : ", error.response?.data);
    } finally {
      set({ checkUserAuth: false });
    }
  },

  loggingIn: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/users/login", userData);
      set({ userAuth: res.data.data });
      console.log(res.data.data);
      toast.success(res.data.message);
      return { success: true };
    } catch (error) {
      console.log("ERR : ", error.response);
      toast.error(error.response.data.message);
      return { success: false, message: error.response?.data };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signingUp: async (userData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/users/register", userData);
      set({ userAuth: res.data.payload });
      console.log(res.data.payload);
      toast.success(`Welcome ${res.data.payload.name}`);
      return { success: true };
    } catch (error) {
      console.log("ERR : ", error.response);
      toast.error(error.response.data.message);
      return { success: false, message: error.response?.data };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  loggingOut: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await axiosInstance.post("/users/logout");
      console.log(res.data);
      set({ userAuth: null });
      toast.success("logged out succesfuly");
      return { success: true };
    } catch (error) {
      console.log(error.response);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfilePic: async (newPicture) => {
    set({ isUploadingProfilePic: true });
    try {
      const newFormData = new FormData();
      newFormData.append("profile_pic", newPicture);
      const uploadingRes = await axiosInstance.put(
        "/users/update-profile",
        newFormData,
      );
      if (uploadingRes.data?.message) toast.success(uploadingRes.data?.message);
      set({ userAuth: uploadingRes.data?.loggedUser });
      console.log(uploadingRes.data);
    } catch (error) {
      toast.error(error?.response.data.message);
      console.log(error.response);
    } finally {
      set({ isUploadingProfilePic: false });
    }
  },
}));
