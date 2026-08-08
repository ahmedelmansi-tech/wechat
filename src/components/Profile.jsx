import { useAuthUser } from "../lib/useAuthUser";
import { useChat } from "../lib/useChat";
import { CiLogin } from "react-icons/ci";
import { useRef } from "react";
import {
  Camera,
  CloudDownload,
  Loader,
  LoaderPinwheel,
  Settings,
  Volume2,
  VolumeOff,
} from "lucide-react";
const Profile = () => {
  const clickSound = useRef(
    new Audio("../public/sounds/frontend_public_sounds_keystroke1.mp3"),
  );

  const uploadInputFile = useRef(null);

  const {
    loggingOut,
    userAuth,
    checkCapility,
    updateProfilePic,
    isUploadingProfilePic,
    onlineUsers,
  } = useAuthUser();
  const { isSoundEnabled, updateSoundStatus } = useChat();

  //   functions ^--^
  const shouldPlayAsound = () => {
    clickSound.current.currentTime = 0;
    clickSound.current.play().catch((err) => console.log(err));
  };

  const handleChangeProfilePic = async (e) => {
    const file = e.target?.files[0];
    if (!file) return;
    updateProfilePic(file);
  };

  // console.log("PERSONAL USER COMPONENT onlineUsers:  ", onlineUsers);

  return (
    <header className="flex-col gap-2 p-1.5">
      {/* avatar */}
      <div className="flex">
        <button
          className={`avatar ${onlineUsers.includes(userAuth._id) && "avatar-online"} size-8 sm:size-15 relative cursor-pointer border rounded-full flex justify-center items-center group`}
          onClick={() => uploadInputFile.current.click()}
        >
          {/* {console.log("IS that True", onlineUsers.includes(userAuth._id))} */}
          {isUploadingProfilePic ? (
            <LoaderPinwheel className="animate-spin duration-700 w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
          ) : (
            <div className="size-full rounded-full">
              <img
                src={
                  userAuth.profile_pic ||
                  "https://placehold.co/800x800?text=AVATAR"
                }
              />
            </div>
          )}

          <div className="absolute inset-0 bg-amber-50/60 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <span className="text-[8px] sm:text-xs">Change</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0"
            hidden
            ref={uploadInputFile}
            onChange={handleChangeProfilePic}
          />
        </button>
        {/* Name and statuts */}
        <div className="hidden sm:block leading-2.5  mx-2 sm:mx-2.5">
          <span className="sm:text-sm text-[8px] font-bold capitalize">
            {userAuth.name}
          </span>
          <br />
          <span
            className={`sm:text-sm text-[10px] ${onlineUsers.includes(userAuth._id) ? "text-green-400" : "text-red-600"}  `}
          >
            {/* hidden sm:inline */}
            {onlineUsers.includes(userAuth._id) ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* sound on/off and  logout  and settings*/}
      <div className="flex flex-col items-center sm:flex-row justify-start sm:justify-center gap-2 lg:gap-1.5 *:border *:rounded *:p-1 *:cursor-pointer mt-5 sm:mt-2">
        <CiLogin
          className="size-5 md:size-6 lg:size-8"
          onClick={() => loggingOut()}
        />
        {isSoundEnabled ? (
          <Volume2
            className="size-5  md:size-6 lg:size-8"
            onClick={() => {
              updateSoundStatus();
            }}
          />
        ) : (
          <VolumeOff
            className="size-5  md:size-6 lg:size-8"
            onClick={() => {
              shouldPlayAsound();
              updateSoundStatus();
            }}
          />
        )}
        <Settings className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
      </div>
    </header>
  );
};

export default Profile;
