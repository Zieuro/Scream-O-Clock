import { Button, ButtonText } from "@/components/ui/button";
import { useClock } from "@/src/hooks/useClock";

export default function MainScreen() {
  useClock();
  return (
    <Button variant="default" size="default">
      <ButtonText>This Is A Button</ButtonText>
    </Button>
  );
}
