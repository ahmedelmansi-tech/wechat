import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MessagesSquare, SmilePlus } from "lucide-react";
import { useAuthUser } from "../lib/useAuthUser";
import Loading from "../components/Loading";
// _________________________________________________________________________ //

const SignupPage = () => {
  const { signingUp, isSigningUp } = useAuthUser();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [data, setData] = useState(null);
  // Functions >>>
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const { name, email, password, confirm_password } = user;

  const sendData = async (e) => {
    e.preventDefault();
    const result = await signingUp(user);

    if (result.success) {
      navigate("/");
    }
  };

  // USING CONTROLLER
  // if (result) {
  //   toast.success("Account Created succesfully");
  // }
  // const sendData = async (e) => {
  //   e.preventDefault();
  //   const controller = new AbortController();

  //   if (!name || !email || !password || !confirm_password) {
  //     toast.error("fill all fields");
  //     return;
  //   }
  //   const sendData = await fetch("/api/v1/users/register", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //     signal: controller.signal,
  //   });

  //   console.log("WHAT YOU SEND", user);
  //   const response = await sendData.json();

  //   if (response.error) {
  //     toast.error(response?.error?.message);
  //     console.log("OPS ....");
  //   }
  //   console.log("WHAT YOU RECIEVED", response);
  // };

  if (isSigningUp) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center *:w-full *:p-5 sm:*:max-w-150 sm:*:mx-auto ">
      {/* WELCOME SIGN className="bg-yellow-200" */}
      <div>
        <h2 className="text-base/7 font-semibold text-gray-900 flex gap-2">
          <span>First time </span> <SmilePlus className="size-5" />
        </h2>
        <p className="mt-1 text-sm/6 p-1.5 pl-0 flex gap-3 items-center">
          <span>We are Happy to join us</span>
          <MessagesSquare className="size-5 animate-bounce" />
        </p>
      </div>
      {/* FORM className="bg-yellow-500"*/}
      <form onSubmit={sendData}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 *:sm:col-span-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="janesmith"
                  className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="janesmith@gmail.com"
                  className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="*********"
                  className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="confirm_password"
                  type="password"
                  name="confirm_password"
                  placeholder="*********"
                  className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>
          {/* BUTTONS  */}
          <div className="flex items-center justify-center sm:justify-start gap-2.5 p-1">
            <button
              className="btn border-2 px-4 rounded-lg cursor-pointer hover:scale-105 duration-200 hover:bg-sky-950 hover:text-white"
              type="submit"
            >
              Sign Up
            </button>

            <Link
              className=" btn border-2 px-3 rounded-lg cursor-pointer hover:scale-105 duration-200 hover:bg-sky-950 hover:text-white"
              to={"/login"}
            >
              have acount
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
