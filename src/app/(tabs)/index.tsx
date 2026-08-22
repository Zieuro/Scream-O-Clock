import { Host, Column, Text } from "@expo/ui";
import TopButtons from "@/ui/components/topButtons";

export default function Index() {
  return (
    <Host colorScheme="dark" style={{ flex: 1, justifyContent: "center" }}>
      <Column alignment="center">
        <Text>Hello</Text>
      </Column>
    </Host>
  );
}
