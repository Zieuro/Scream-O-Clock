import { Button, ButtonText } from "@/components/ui/button";
import { useClock } from "@/src/hooks/useClock";

export default function MainScreen() {
  useClock();
  return (
    <Button variant="outline" size="lg">
      <ButtonText>BUTT on</ButtonText>
    </Button>
  );
}
