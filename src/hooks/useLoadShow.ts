import { useAppStore } from "@/state/store";
import { useEffect } from "react";

export function useLoadShow() {
  const { loadShow, now, show, showBuiltFor, hydrated } = useAppStore();

  useEffect(() => {
    if (!hydrated) return;
    const isNewDay = showBuiltFor !== new Date(now).toDateString();
    if (isNewDay && (!show || now > show.clearTime)) {
      loadShow(new Date());
    }
  }, [loadShow, now, show, showBuiltFor, hydrated]);
}
