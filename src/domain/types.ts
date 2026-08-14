export type PersonId = "A" | "B" | "C";
export type Position = "pos1" | "pos2" | "off" | "meal";

export interface Assignment {
  person: PersonId;
  position: Position;
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
  assignments: Assignment[];
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
