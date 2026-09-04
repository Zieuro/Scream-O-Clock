import { useEffect } from "react";
import { useAppStore } from "@/state/store";

export default function useDisarm() {
  const disarm = useAppStore((s) => s.disarm)
  useEffect(() => {
    disarm()
  }, [disarm])
}