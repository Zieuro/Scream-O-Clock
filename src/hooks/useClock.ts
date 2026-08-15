import { useAppStore } from "@/src/state/store";
import { useEffect } from "react";

export function useClock() {
  const tick = useAppStore.getState().tick
  tick(Date.now())
  useEffect(() => {
    const interval = setInterval(() => {
      tick(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
}
