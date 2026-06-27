import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthUser } from "./lib/useAuthUser";
import { Toaster } from "react-hot-toast";
// import Nav from "./components/Nav";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const { checkCapility, userAuth, checkUserAuth } = useAuthUser();

  useEffect(() => {
    checkCapility();
    console.log("USER AUTH", userAuth);
  }, [checkCapility]);

  // console.log("BEFORE THE LOADING", userAuth);

  if (checkUserAuth) return <Loading />;
  return (
    <div className="bg-[linear-gradient(to_bottom_right,#0f172a,#8a92a8,#3b82f6)] w-full h-screen">
      {/* <Nav /> */}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={userAuth ? <ChatPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
