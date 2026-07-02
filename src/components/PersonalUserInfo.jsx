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
    <header className="flex justify-between items-center px-1.5 w-full">
      {/* avatar */}
      <div className="flex gap-1.5">
        <button
          className="avatar avatar-online size-15 relative cursor-pointer border rounded-full flex justify-center items-center group"
          onClick={() => uploadInputFile.current.click()}
        >
          {isUploadingProfilePic ? (
            <LoaderPinwheel size={25} className="animate-spin duration-700" />
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
            <span className="text-xs">Change</span>
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
        <div className="leading-px">
          <span className="text-sm">{userAuth.name}</span>
          <br />
          <span className="text-xs text-green-400">Online</span>
        </div>
      </div>

      {/* sound on/off and  logout */}
      <div className="flex items-center gap-2.5  *:border *:rounded *:p-1 *:cursor-pointer">
        <CiLogin size={25} onClick={() => loggingOut()} />
        {isSoundEnabled ? (
          <Volume2
            size={25}
            onClick={() => {
              updateSoundStatus();
            }}
          />
        ) : (
          <VolumeOff
            size={25}
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
