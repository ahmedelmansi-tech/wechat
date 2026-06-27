// import { useAuthUser } from "../lib/useAuthUser";

// import { useEffect, useRef } from "react";
// const Nav = () => {
//   const uploadImageBtn = useRef(null);

//   // ZUSTAND STATES
//   const {
//     loggingOut,
//     userAuth,
//     checkCapility,
//     updateProfilePic,
//     isUploadingProfilePic,
//   } = useAuthUser();
//   console.log(isUploadingProfilePic);

//   const handleProfilePic = async (file) => {
//     console.log("Update Your Pic");
//     // updateProfilePic(file);
//   };

//   const clickSound = new Audio(
//     "../public/sounds/frontend_public_sounds_keystroke1.mp3",
//   );
//   const shouldPlayAsound = () => {
//     clickSound.currentTime = 0;
//     clickSound.play().catch((err) => console.log(err));
//   };

//   return (
//     <div className="fixed py-5 px-6 flex justify-between items-center max-w-full w-[75%] sm:w-[80%] left-1/2 -translate-x-1/2 text-gray-100 border-b-2">
//       <span className="hover:tracking-[9px] transition-all duration-300">
//         WE-ChaT
//       </span>

//       <span
//         className="p-3.5 bg-white absolute top-full left-0 mt-2 text-bold text-2xl rounded-md text-green-500"
//         onClick={shouldPlayAsound}
//       >
//         {userAuth.name}
//         <BadgeCheck className="absolute top-1 right-1 " size={15} />
//       </span>
//       <div className="absolute right-0 top-20 w-20 h-20">
//         <div
//           className="relative flex justify-center items-center rounded-full overflow-hidden cursor-pointer size-16 border group "
//           onClick={() => uploadImageBtn.current.click()}
//         >
//           <input
//             type="file"
//             accept="image/*"
//             ref={uploadImageBtn}
//             hidden
//             onChange={(e) => updateProfilePic(e.target.files[0])}
//           />
//           <img
//             src={
//               userAuth.profile_pic || "https://placehold.co/800x800?text=AVATAR"
//             }
//             onError={(e) =>
//               (e.currentTarget.src = "https://placehold.co/800x800?text=AVATAR")
//             }
//             alt="profile"
//             className="size-full object-cover"
//           />
//           {!isUploadingProfilePic ? (
//             <Camera
//               size={30}
//               className="absolute duration-75 opacity-0 left-[50%] top-[50%] translate-x-[-50%] translate-y-[150%] group-hover:translate-y-[-50%] group-hover:opacity-100"
//               color={"gray"}
//             />
//           ) : (
//             <CloudDownload
//               size={30}
//               className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
//             />
//           )}
//           {/* <Camera
//             size={30}
//             className="absolute duration-75 opacity-0 left-[50%] top-[50%] translate-x-[-50%] translate-y-[150%] group-hover:translate-y-[-50%] group-hover:opacity-100"
//             color={"gray"}
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav;
