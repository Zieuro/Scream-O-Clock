import { Button, ButtonGroup, ButtonIcon } from "@/components/ui/button";
import { BellIcon, SettingsIcon } from "@/components/ui/icon";

export default function TopButtons() {
  return (
    <ButtonGroup flexDirection="row" className="p-5 justify-between">
      <Button size="lg" className="rounded-full p-3.5 bg-zinc-900 outline-zinc-800 outline-1">
        <ButtonIcon as={BellIcon} />
      </Button>

      <Button size="lg" className="rounded-full p-3.5 bg-zinc-900 outline-zinc-800 outline-1">
        <ButtonIcon as={SettingsIcon} />
      </Button>
    </ButtonGroup>
  );
}
