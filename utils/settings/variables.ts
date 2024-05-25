import {
  LockKeyhole,
  LucideIcon,
  MessageCircleQuestion,
  SlidersVertical,
} from "lucide-react";

type SettingsLinksType = {
  section: string;
  title: string;
  icon: LucideIcon;
};

export const settingsLinks = <SettingsLinksType[]>[
  {
    section: `general`,
    title: "Загальні",
    icon: SlidersVertical,
  },
  {
    section: `security`,
    title: "Безпека",
    icon: LockKeyhole,
  },
  {
    section: `support`,
    title: "Підтримка",
    icon: MessageCircleQuestion,
  },
];
