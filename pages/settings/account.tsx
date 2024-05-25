import SecurityPage from "@/components/pages/security/SecurityPage";
import SettingsAccountPage from "@/components/pages/security/account/account-layout";

const index = () => {
  return (
    <SecurityPage>
      <SettingsAccountPage />
    </SecurityPage>
  );
};

export default index;
