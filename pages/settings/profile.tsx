import SecurityPage from "@/components/pages/security/SecurityPage";
import SettingsProfilePage from "@/components/pages/security/profile/profile-layout";
import React from "react";

const index = () => {
  return (
    <SecurityPage>
      <SettingsProfilePage />
    </SecurityPage>
  );
};

export default index;
