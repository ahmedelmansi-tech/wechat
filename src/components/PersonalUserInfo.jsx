import { useAuthUser } from "../lib/useAuthUser";
import { useChat } from "../lib/useChat";
import { CiLogin } from "react-icons/ci";
import { useRef } from "react";
import {
  BadgeCheck,
  Camera,
  CloudDownload,
  Loader,
  LoaderPinwheel,
  Volume2,
  VolumeOff,
} from "lucide-react";

const PersonalUserInfo = () => {
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
  return (
    <header className="flex justify-between items-center px-0.5 sm:px-1.5 w-full">
      {/* avatar */}
      <div className="flex gap-0.5 sm:gap-1.5">
        <button
          className="avatar avatar-online size-8 sm:size-15 relative cursor-pointer border rounded-full flex justify-center items-center group"
          onClick={() => uploadInputFile.current.click()}
        >
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
        <div className="leading-3.5 mx-2 sm:mx-2.5">
          <span className="sm:text-sm text-[8px] font-bold capitalize">
            {userAuth.name}
          </span>
          <br />
          <span className="sm:text-sm text-[10px] text-green-400 hidden sm:inline">
            Online
          </span>
        </div>
      </div>

      {/* sound on/off and  logout */}
      <div className="flex items-center gap-1 lg:gap-1.5 *:border *:rounded *:p-1 *:cursor-pointer">
        <CiLogin
          className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
          onClick={() => loggingOut()}
        />
        {isSoundEnabled ? (
          <Volume2
            className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
            onClick={() => {
              updateSoundStatus();
            }}
          />
        ) : (
          <VolumeOff
            className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
            onClick={() => {
              shouldPlayAsound();
              updateSoundStatus();
            }}
          />
        )}
      </div>
    </header>
  );
};

export default PersonalUserInfo;
