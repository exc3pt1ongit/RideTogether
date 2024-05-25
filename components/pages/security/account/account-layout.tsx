import { Separator } from "@/components/ui/separator";
import React from "react";
import AccountForm from "./account-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Обліковий запис</h3>
        <p className="text-sm text-muted-foreground">
          Перегляньте налаштування свого облікового запису швидко та зручно!
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
