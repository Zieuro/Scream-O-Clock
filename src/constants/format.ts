import { Position } from "@/domain/types";

export const fmt = (ms: number) =>
  new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export function getLabel(pos: Position): string {
  switch (pos) {
    case "pos1":
      return "Position 1";
    case "pos2":
      return "Position 2";
    case "meal":
      return "Meal";
    case "off":
      return "Break";
    case "on":
      return "On Set";
  }
}

export function getScheduleLabel(pos: Position): string {
  switch (pos) {
    case "pos1":
      return "1";
    case "pos2":
      return "2";
    case "meal":
      return "MEAL";
    case "off":
      return "BREAK";
    case "on":
      return "ON";
  }
}
