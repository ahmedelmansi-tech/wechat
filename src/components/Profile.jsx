import PersonalUserInfo from "./PersonalUserInfo";
import ActiveContactsTab from "./ActiveContactsTab";
const Profile = () => {
  return (
    <div className="border-b-2">
      <PersonalUserInfo />
      <ActiveContactsTab />
    </div>
  );
};

export default Profile;
