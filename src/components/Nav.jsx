import { CiLogin } from "react-icons/ci";
import { BadgeCheck, Camera } from "lucide-react";
import { useAuthUser } from "../lib/useAuthUser";
import { useEffect } from "react";
const Nav = () => {
  const { loggingOut, userAuth, checkCapility, updateProfilePic } =
    useAuthUser();

  // useEffect(() => {
  //   checkCapility();
  // }, [checkCapility]);

  const handleProfilePic = () => {
    console.log("Update Your Pic");
  };

  return (
    <div className="fixed py-5 px-6 flex justify-between items-center max-w-full w-[75%] sm:w-[80%] left-1/2 -translate-x-1/2 text-gray-100 border-b-2">
      <span className="hover:tracking-[9px] transition-all duration-300">
        WE-ChaT
      </span>
      <CiLogin
        size={30}
        className="cursor-pointer border rounded"
        onClick={() => loggingOut()}
      />
      <span className="pt-7 pb-5 px-3 bg-white absolute top-full left-0 mt-2 text-bold text-2xl rounded-md text-green-500">
        {userAuth.name}
        <BadgeCheck className="absolute top-1 right-1 " />
      </span>
      <div className="absolute right-0 top-20 w-16 h-16">
        <div
          className="relative flex justify-center items-center rounded-full overflow-hidden cursor-pointer border group "
          onClick={handleProfilePic}
        >
          <img
            src={
              userAuth.profile_pic || "https://placehold.co/800x800?text=AVATAR"
            }
            alt="avatar"
            className="w-full h-full"
          />
          <Camera
            size={30}
            className="absolute duration-75 opacity-0 left-[50%] top-[50%] translate-x-[-50%] translate-y-[150%] group-hover:translate-y-[-50%] group-hover:opacity-100"
            color={"gray"}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
