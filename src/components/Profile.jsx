import PersonalUserInfo from "./PersonalUserInfo";
import ActiveContactsTab from "./ActiveContactsTab";
const Profile = () => {
  // border-b-2

  return (
    <div className="pt-2 border-b-2 ">
      <PersonalUserInfo />
      <ActiveContactsTab />
    </div>
  );
};

export default Profile;
