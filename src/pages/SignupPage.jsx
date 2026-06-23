import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const SignupPage = () => {
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
    const controller = new AbortController();

    if (!name || !email || !password || !confirm_password) {
      toast.error("fill all fields");
      return;
    }
    const sendData = await fetch("/api/v1/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      signal: controller.signal,
    });

    console.log("WHAT YOU SEND", user);
    const response = await sendData.json();

    if (response.error) {
      toast.error(response?.error?.message);
      console.log("OPS ....");
    }
    console.log("WHAT YOU RECIEVED", response);
  };

  return (
    <form className="max-w-150 p-9 mx-auto ">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            First time
          </h2>
          <p className="mt-1 text-sm/6 text-gray-100">
            We are Happy to join us
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
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

          <div className="sm:col-span-4">
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

          <div className="sm:col-span-4">
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

          <div className="sm:col-span-4">
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
        </div>
      </div>

      <button
        className="w-full sm:w-87 btn  border-2 px-3 py-1 rounded-lg cursor-pointer hover:scale-105 duration-200 hover:bg-sky-950 hover:text-white mt-8"
        onClick={sendData}
      >
        Sign Up
      </button>
      <br />
      <Link
        className="inline-block btn border-2 px-3 py-1 rounded-lg cursor-pointer hover:scale-105 duration-200 hover:bg-sky-950 hover:text-white mt-8"
        to={"/login"}
      >
        have acount
      </Link>
    </form>
  );
};

export default SignupPage;
