import {
  Button,
  BottomSheet,
  RadioGroup,
  Label,
  Description,
  Radio,
  Separator,
} from "heroui-native";
import { useSettingsStore } from "@/state/settingsStore";
import { View, Text } from "react-native";

export default function RoleTypeButton() {
  const { roleType, setRoleType, role, setRole } = useSettingsStore();

  const handleRoleTypeChange = (value: string) => {
    if (value === "standard" || value === "specialty") {
      setRoleType(value);
      if (role === "c") {
        setRole("a");
      }
    }
  };

  return (
    <BottomSheet>
      <BottomSheet.Trigger asChild>
        <Button
          size="lg"
          variant="tertiary"
          className="mx-15 bg-card outline-1 outline-neutral-800 shadow-lg shadow-neutral-950"
        >
          <Text className="font-mpu-semibold text-3xl text-foreground">
            Role Type
          </Text>
        </Button>
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="pr-10">
            <RadioGroup value={roleType} onValueChange={handleRoleTypeChange}>
              <RadioGroup.Item value="standard">
                {({ isSelected }) => (
                  <>
                    <View className="pr-5">
                      <Label>Standard</Label>
                      <Description>
                        For those who are following the standard house, zone,
                        and horde 20 minute rotation
                      </Description>
                    </View>

                    <Radio variant="secondary">
                      <Radio.Indicator
                        className={isSelected ? "bg-primary" : ""}
                      />
                    </Radio>
                  </>
                )}
              </RadioGroup.Item>

              <Separator className="my-1" />

              <RadioGroup.Item value="specialty">
                {({ isSelected }) => (
                  <>
                    <View>
                      <Label>Specialty</Label>
                      <Description>
                        For those who are in a specialty role following the
                        30-on 30-off schedule
                      </Description>
                    </View>

                    <Radio variant="secondary">
                      <Radio.Indicator
                        className={isSelected ? "bg-primary" : ""}
                      />
                    </Radio>
                  </>
                )}
              </RadioGroup.Item>
            </RadioGroup>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
