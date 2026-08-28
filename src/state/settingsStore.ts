import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LabelFormat, Role, RoleType, Venue } from "@/domain/types";

interface SettingState {
  //state
  venue: Venue;
  roleType: RoleType;
  role: Role;
  labelFormat: LabelFormat;

  //actions
  setVenue: (venue: Venue) => void;
  setRoleType: (roleType: RoleType) => void;
  setRole: (role: Role) => void;
  setLabelFormat: (labelFormat: LabelFormat) => void;
}

export const useSettingsStore = create<SettingState>()(
  persist(
    (set) => ({
      venue: "house",
      roleType: "normal",
      role: "a",
      labelFormat: "abc",

      setVenue: (venue) => set({ venue }),
      setRoleType: (roleType) => set({ roleType }),
      setRole: (role) => set({ role }),
      setLabelFormat: (labelFormat) => set({ labelFormat }),
    }),
    {
      name: "scream-o-clock-settings",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
