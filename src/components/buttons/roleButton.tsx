import { useSettingsStore } from "@/state/settingsStore";
import { Role } from "@/domain/types";
import { ReactNode } from "react";
import { PressableFeedback } from "heroui-native";

type RoleButtonProps = { buttonRole: Role; children?: ReactNode };

export default function RoleButton({ buttonRole, children }: RoleButtonProps) {
  const setRole = useSettingsStore((s) => s.setRole);
  const role = useSettingsStore((s) => s.role);

  const isActive = buttonRole === role;

  return (
    <PressableFeedback
      className={
        isActive
          ? "rounded-3xl bg-primary outline-1 outline-primary shadow-lg shadow-neutral-950 w-25 h-25 flex items-center justify-center"
          : "rounded-3xl bg-card outline-1 outline-neutral-800 shadow-lg shadow-neutral-950 w-25 h-25 flex items-center justify-center"
      }
      onPress={() => setRole(buttonRole)}
      accessibilityRole="button"
           accessibilityLabel={`Select role ${buttonRole.toUpperCase()}`}
           accessibilityState={{ selected: isActive }}
           animation={{ scale: { value: 0.97 } }}
    >
      <PressableFeedback.Highlight />
      {children}
    </PressableFeedback>
  );
}