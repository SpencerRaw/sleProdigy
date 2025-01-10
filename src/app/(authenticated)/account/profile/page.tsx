import { Heading } from "@/components/heading";
import { AccountTabs } from "../_navigation/tabs";

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="账户" description="你的个人信息" tabs={<AccountTabs />} />
    </div>
  );
};

export default ProfilePage;
