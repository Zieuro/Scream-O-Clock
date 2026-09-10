import { useAppStore } from "@/state/store";
import { useSettingsStore } from "@/state/settingsStore";
import { useEffect, useRef } from "react";

export function useLoadShow() {
  const loadShow = useAppStore((s) => s.loadShow);
  const now = useAppStore((s) => s.now);
  const show = useAppStore((s) => s.show);
  const showBuiltFor = useAppStore((s) => s.showBuiltFor);
  const hydrated = useAppStore((s) => s.hydrated);
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
