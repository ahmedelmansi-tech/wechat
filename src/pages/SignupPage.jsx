import { useState, useEffect } from "react";
const SignupPage = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // Functions >>>
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    console.log(user);
    const controller = new AbortController();

    const sendData = await fetch(
      "/v1/api/try",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
      {
        signal: controller.signal,
      },
    );

    if (sendData) {
      console.log("DONE )))");
    }
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
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <input
                  id="username"
                  type="text"
                  name="userName"
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
    </form>
  );
};

export default SignupPage;
