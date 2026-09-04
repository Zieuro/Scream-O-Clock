import { useAppStore } from "@/state/store";
import { useEffect } from "react";

export function useLoadShow() {
  const { loadShow, now, show } = useAppStore();

  useEffect(() => {
    if (show && (now > show.clearTime)) {
      loadShow(new Date())
    }
  }, [loadShow, now, show]);
}