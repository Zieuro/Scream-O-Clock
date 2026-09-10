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

export const POS_STYLE: Record<Position, { label: string; className: string }> =
  {
    pos1: {
      label: "1",
      className: "font-quicksand-semibold text-foreground text-xl",
    },
    pos2: {
      label: "2",
      className: "font-quicksand-semibold text-foreground text-xl",
    },
    meal: {
      label: "MEAL",
      className: "font-quicksand-semibold text-tertiary text-lg",
    },
    off: {
      label: "BREAK",
      className: "font-quicksand-semibold text-secondary text-lg",
    },
    on: {
      label: "ON",
      className: "font-quicksand-semibold text-foreground text-lg",
    },
  };

export function getScheduleLabel(pos: Position, positionView: boolean): Position {
  if (!positionView && (pos === "pos1" || pos === "pos2")) {
    return "on"
  }
  return (pos)
}

export function getRandom<T>(arr: readonly T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}