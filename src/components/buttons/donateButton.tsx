import { Button } from "heroui-native";
import { Text, Linking } from "react-native";
import { Image } from "expo-image";

const handlePress = async () => {
   const url = `https://ko-fi.com/zieuro`;
   const supported = await Linking.canOpenURL(url);

   if (supported) {
     await Linking.openURL(url);
   } else {
     console.error(`Bruh I don't know about this URL, Chief: ${url}`);
   }
 };

export default function DonateButton() {
  return (
    <Button variant="tertiary" className="rounded-full bg-card shadow-lg shadow-neutral-950 outline-1 outline-zinc-800" onPress={handlePress}>
      <Text className="text-foreground text-xl font-mpu-medium">Donate</Text>
      <Image
        source={require("@/assets/images/kofi.svg")}
        contentFit="contain"
        style={{ width: 22, height: 18 }}
      />
    </Button>
  );
}
