import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, View, Text } from "react-native";
import { Alert, Button, Dialog, useToast } from "heroui-native";
import { supabase } from "@/services/supabase";
import { useAppStore } from "@/state/store";
import { checkForScheduleUpdates } from "@/services/scheduleCheck";

// Tables that feed the schedule: any Supabase edit re-runs the check, so the
// dialog appears the moment the data is edited while the app is open.
const SCHEDULE_TABLES = [
  "season_config",
  "slot_assignment",
  "specialty_slot_assignment",
];

export default function ScheduleUpdateDialog() {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const showBuiltFor = useAppStore((s) => s.showBuiltFor);
  const { toast } = useToast();

  // The check is fully event-driven: launch, foreground return, Realtime
  // event, and loadShow completion (showBuiltFor flips to today). Bursts
  // collapse into one run plus a single queued follow-up.
  const checking = useRef(false);
  const rerunPending = useRef(false);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const run = useCallback(async () => {
    checking.current = true;
    try {
      // A queued rerun (from a trigger arriving mid-check) loops back here
      // instead of recursing, which the React Compiler cannot memoize.
      do {
        rerunPending.current = false;
        const { showBuiltFor: builtFor } = useAppStore.getState();
        // A new day (or post-clear) means loadShow refreshes the schedule on
        // its own — the check is only for same-day Supabase changes that the
        // gated loadShow would miss.
        if (builtFor !== new Date().toDateString()) return;
        const changed = await checkForScheduleUpdates();
        if (changed && mounted.current) setOpen(true);
      } while (rerunPending.current);
    } finally {
      checking.current = false;
    }
  }, []);

  useEffect(() => {
    void run();
    const foreground = AppState.addEventListener("change", (state) => {
      if (state === "active") void run();
    });
    const channels = SCHEDULE_TABLES.map((table) =>
      supabase
        .channel(`schedule-updates-${table}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table },
          () => void run()
        )
        .subscribe()
    );
    return () => {
      foreground.remove();
      channels.forEach((channel) => supabase.removeChannel(channel));
    };
  }, [run]);

  // Re-check when loadShow completes (showBuiltFor flips to today's date).
  useEffect(() => {
    void run();
  }, [showBuiltFor, run]);

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      // loadShow cancels all notifications and disarms — re-arm so the
      // reminders match the updated schedule instead of silently dropping.
      const wasArmed = useAppStore.getState().armed;
      await useAppStore.getState().loadShow(new Date());
      if (wasArmed) await useAppStore.getState().arm();
      toast.show({
        variant: "success",
        label: "Schedule updated",
        description: "Reminders now match the latest schedule",
      });
      setOpen(false);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog isOpen={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Alert status="warning">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Schedule updated</Alert.Title>
              <Alert.Description>
                The rotation schedule has changed since you last opened the
                app. Update your reminders to match the new schedule?
              </Alert.Description>
            </Alert.Content>
          </Alert>
          <View className="flex-row justify-center gap-3 mt-3">
            <Button
              variant="secondary"
              isDisabled={updating}
              onPress={() => setOpen(false)}
            >
              <Text className="text-foreground">Later</Text>
            </Button>
            <Button
              className="bg-primary"
              isDisabled={updating}
              onPress={handleUpdate}
            >
              <Text className="text-white">
                {updating ? "Updating…" : "Update Info"}
              </Text>
            </Button>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
