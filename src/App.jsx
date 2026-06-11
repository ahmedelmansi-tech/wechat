import "./App.css";
import { Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="bg-[linear-gradient(to_bottom_right,#0f172a,#8a92a8,#3b82f6)] w-full h-screen">
      {/* <Nav /> */}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
