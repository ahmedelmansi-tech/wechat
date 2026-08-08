import { create } from "zustand";
import { axiosInstance } from "./axios";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthUser = create((set, get) => ({
  userAuth: null,
  checkUserAuth: true,
  isLoggingIn: false,
  isLoggingOut: false,
  isSigningUp: false,
  isUploadingProfilePic: false,
  socket: null,
  onlineUsers: [],
  activeUsers: [],

  checkCapility: async () => {
    try {
      const res = await axiosInstance.get("/users/check");
      set({ userAuth: res.data.user });
      get().connectWithSocket();
      // console.log("Check Auth Func : auth is", get().userAuth);
      // setTimeout(() => {
      //   console.log("بعد ثانيتين", "Check Auth Func : socket is", get().socket);
      // }, 2000);
      // console.log("Check Auth Func : socket is", get().socket);
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
      set({ userAuth: res.data?.data });
      console.log("LOGGING IN _", res.data.data);
      toast.success(res.data.message);
      get().connectWithSocket();
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
      get().disConnectWithSocket();
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

  updateActiveUsers: async (activeUsersOnly) => {
    try {
      const result = await axiosInstance.post(
        "/users/onlineUsers",
        activeUsersOnly,
      );
      set({ activeUsers: result.data.data });
      console.log("ON IDS ".bgGreen, result.data);
    } catch (error) {
      console.log(error.response);
    }
  },
  connectWithSocket: () => {
    const { userAuth, socket } = get();
    if (!userAuth || socket?.connected) {
      console.log("No need to reconncted");
      return;
    }
    // @make the url dynamic for deployment
    const newUserSocket = io("http://localhost:3300", {
      withCredentials: true,
    });

    newUserSocket.on("onlineUsers", (data) => {
      set({ onlineUsers: data });
    });
    // newUserSocket.connect(); // Don't need it anymore as io connect automaticly
    newUserSocket.on("connect", () => {
      set({ socket: newUserSocket });
      console.log("SOCKET : ****", get().socket);
    });

    // For Debugging
    newUserSocket.on("disconnect", (reason) => {
      console.log("DISCONNECTED", reason);
    });
    newUserSocket.on("connect_error", (err) => {
      console.log("ERROR", err);
    });
  },
  disConnectWithSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
