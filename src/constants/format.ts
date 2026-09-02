import { Position } from "@/domain/types";

// export const fmt = (ms: number) =>
//   new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export function getLabel(pos: Position): string | undefined {
  switch (pos) {
    case "pos1":
      return "Position 1"
    case "pos2":
      return "Position 2"
    case "meal":
      return "Meal"
    case "off":
      return "Break"
    case "on":
      return "On Set"
  }
};