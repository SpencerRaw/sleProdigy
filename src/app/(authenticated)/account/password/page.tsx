import { Heading } from "@/components/heading";
import { AccountTabs } from "../_navigation/tabs";

const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="密码"
        description="注意账户安全！"
        tabs={<AccountTabs />}
      />
    </div>
  );
};

export default PasswordPage;
