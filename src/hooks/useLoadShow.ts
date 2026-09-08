import { useAppStore } from "@/state/store";
import { useSettingsStore } from "@/state/settingsStore";
import { useEffect, useRef } from "react";

export function useLoadShow() {
  const { loadShow, now, show, showBuiltFor, hydrated } = useAppStore();
  const roleType = useSettingsStore((s) => s.roleType);
  const prevRoleType = useRef(roleType)

  useEffect(() => {
    if (!hydrated) return;
    const roleTypeChanged = prevRoleType.current !== roleType
    prevRoleType.current = roleType
    const isNewDay = showBuiltFor !== new Date(now).toDateString();
    if (roleTypeChanged || (isNewDay && (!show || now > show.clearTime))) {
      loadShow(new Date());
    }
  }, [loadShow, now, show, showBuiltFor, hydrated, roleType]);
}
