import {
  Button,
  BottomSheet,
  useBottomSheet,
  useToast,
} from "heroui-native";
import { FeedbackSheet, uploadQueueService } from "@harkenapp/sdk-react-native";
import { Text } from "react-native";
import { useState } from "react";

function FeedbackForm() {
  const { isOpen, onOpenChange } = useBottomSheet();
  const { toast } = useToast();
  const [session, setSession] = useState(0);
  const [wasOpen, setWasOpen] = useState(false);

  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setSession((s) => s + 1);
    }
  }

  return (
    <FeedbackSheet
      key={session}
      layout="flex"
      showSuccessAlert={false}
      onSuccess={() => {
        void uploadQueueService.clearCompleted();
        toast.show({
          variant: "success",
          label: "Feedback sent",
          description: "Thanks for helping improve Scream-O-Clock!",
          placement: "top",
        });
        onOpenChange(false);
      }}
      onError={(error) => {
        toast.show({
          variant: "danger",
          label: "Submission failed",
          description: error.message,
          placement: "top",
        });
      }}
      onCancel={() => onOpenChange(false)}
    />
  );
}

export default function FeedbackButton() {
  return (
    <BottomSheet>
      <BottomSheet.Trigger asChild>
        <Button
          variant="tertiary"
          className="rounded-full bg-card shadow-lg shadow-neutral-950 outline-1 outline-zinc-800"
        >
          <Text className="font-mpu-medium text-xl text-foreground">
            Feedback
          </Text>
        </Button>
      </BottomSheet.Trigger>
      <BottomSheet.Portal disableFullWindowOverlay>
        <BottomSheet.Overlay variant="blur" blurViewProps={{ intensity: 80 }} />
        <BottomSheet.Content>
          <FeedbackForm />
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
