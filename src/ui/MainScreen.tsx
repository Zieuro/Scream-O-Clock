import { Button, ButtonText } from "@/components/ui/button";
import { useClock } from "@/src/hooks/useClock";
import CircularProgress from "react-native-circular-progress-indicator";

export default function MainScreen() {
  useClock();
  return (
    <Button variant="outline" size="lg">
      <ButtonText>This Is A Button</ButtonText>
    </Button>
  );
}
