import { useAppStore } from "@/state/store";
import { useEffect } from "react";

function useClock() {
  const tick = useAppStore.getState().tick
  useEffect(() => {
    const interval = setInterval(() => {
      tick(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
}
