import { CiLogin } from "react-icons/ci";
const Nav = () => {
  return (
    <div className="fixed py-5 px-6 flex justify-between items-center max-w-full w-[75%] sm:w-[80%] left-1/2 -translate-x-1/2 text-gray-100 border-b-2">
      <span className="hover:tracking-[9px] transition-all duration-300">
        WE-ChaT
      </span>
      <CiLogin size={30} className="cursor-pointer border rounded" />
    </div>
  );
};

export default Nav;
