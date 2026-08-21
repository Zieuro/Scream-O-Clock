import { Host, Column } from "@expo/ui";
import TopButtons from "@/ui/components/topButtons";

export default function Index() {
  return (
    <Host colorScheme="dark" style={{ flex: 1 }}>
      <Column>
        <TopButtons />
      </Column>
    </Host>
  );
}
