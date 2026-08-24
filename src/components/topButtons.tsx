import { Row, Button, Icon, Spacer } from "@expo/ui";

export default function TopButtons() {
  return (
    <Row style={{ paddingHorizontal: 20 }}>
      <Button onPress={() => {}}>
        <Icon name={"bell.fill"} />
      </Button>

      <Spacer />

      <Button onPress={() => {}}>
        <Icon name={"gearshape.fill"} />
      </Button>
    </Row>
  );
}
