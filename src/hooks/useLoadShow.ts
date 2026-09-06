import { useAppStore } from "@/state/store";
import { useEffect } from "react";

export function useLoadShow() {
  const { loadShow, now, show, showBuiltFor, hydrated } = useAppStore();

  useEffect(() => {
    if (!hydrated) return;
    if (show) {
      // a live show owns the clock until clearTime, even across midnight
      if (now > show.clearTime) loadShow(new Date());
    } else if (showBuiltFor !== new Date(now).toDateString()) {
      // nothing built today: fresh install, or the tail of a no-show stretch
      loadShow(new Date());
    }
  }, [loadShow, now, show, showBuiltFor, hydrated]);
}
