import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Show, Slot } from "@/domain/types";
import { buildSlots } from "@/domain/slots";
import { buildTodaysShow } from "@/domain/show";

interface AppState {
  //state
  now: number;
  show: Show | null
  slots: Slot[]
  armed: boolean
  ringingSlot: string | null
  //actions
  tick: (now: number) => void;
  loadShow: (date: Date) => void;
  arm: () => void;
  disarm: () => void;
  stopRingingSlot: () => void;
}

export const useAppStore= create<AppState>()(persist((set) => ({
  now: Date.now(),
  show: null,
  slots: [],
  armed: false,
  ringingSlot: null,
  
  tick: (now) => set({ now }),
  loadShow: (date) => {
    const show = buildTodaysShow(date)
    if (show != null) {
      set({show: show, slots: buildSlots(show)})
    } else {
      set({show: null, slots: []})
    }
  },
  arm: () => set({armed: true}),
  disarm: () => set({armed: false}),
  stopRingingSlot: () => set({ringingSlot: null}),
}), {
  name: "scream-o-clock-store",
  storage: createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({show: state.show, slots: state.slots, armed: state.armed })
}));