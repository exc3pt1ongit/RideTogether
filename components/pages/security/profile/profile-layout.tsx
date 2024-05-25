import { Separator } from "@/components/ui/separator";
import React from "react";
import { ProfileForm } from "./profile-form";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Профіль</h3>
        <p className="text-sm text-muted-foreground">
          Це те, як інші будуть бачити вас на сайті.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
