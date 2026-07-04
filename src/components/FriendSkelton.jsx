import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const FriendSkelton = () => {
  return (
    <div className="flex items-center gap-2 p-2 mt-5 space-y-3.5 flex-1">
      <div className="sm:size-15 lg:size-21 size-13">
        <Skeleton circle width={"100%"} height={"100%"} />
      </div>
      <div className="w-full">
        <Skeleton width={"85%"} height={25} className="mb-2" />
        <Skeleton width={"55%"} height={21} />
      </div>
    </div>
  );
};

export default FriendSkelton;
