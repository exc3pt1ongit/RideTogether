import SecurityPage from "@/components/pages/security/SecurityPage";
import SettingsAppearancePage from "@/components/pages/security/appearance/appearance-layout";

const index = () => {
  return (
    <SecurityPage>
      <SettingsAppearancePage />
    </SecurityPage>
  );
};

export default index;
