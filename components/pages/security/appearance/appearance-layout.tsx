import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Оформлення</h3>
        <p className="text-sm text-muted-foreground">
          Налаштуйте зовнішній вигляд програми. Автоматичне перемикання між
          денною та нічною темами.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
