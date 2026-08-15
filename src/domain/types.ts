export type Position = "pos1" | "pos2" | "off" | "meal";

export interface Row {
  id: number;
  a: Position;
  b: Position;
  c: Position;
}

export interface Show {
  callTime: number;
  startTime: number;
  endTime: number;
  clearTime: number;
  slotMinutes: number;
}

export interface Slot {
  id: string;
  start: number;
  end: number;
  row: Row | null;
}

export type Season_Config = Record<
  number,
  {
    days: number[];
    callHour: number;
    startHour: number;
    endHours: Record<number, number>;
  }
>;
