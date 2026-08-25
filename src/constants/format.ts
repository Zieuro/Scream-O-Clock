import { Position } from "@/domain/types";

export const fmt = (ms: number) =>
  new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export const POS_LABEL: Record<Position, string> = {
  pos1: "POS 1",
  pos2: "POS 2",
  off: "OFF",
  meal: "MEAL",
};
