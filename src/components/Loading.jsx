import { Loader } from "lucide-react";
const Loading = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Loader size={50} className="animate-spin" />
    </div>
  );
};

export default Loading;
