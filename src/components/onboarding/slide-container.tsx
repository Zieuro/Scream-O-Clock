import { PropsWithChildren } from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { Colors } from "@/constants/colors";

type Props = {
  title: string;
  description: string;
};

export const SlideContainer: React.FC<PropsWithChildren<Props>> = ({
  title,
  description,
  children,
}) => {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width }} className="h-full">
      <View className="w-full h-1/2">{children}</View>
      <View className="w-full h-1/2 items-center justify-center px-5">
        <Text
          className="text-3xl text-center"
          style={{ color: Colors.foreground }}
        >
          {title}
        </Text>
        <Text
          className="text-base mt-5 text-center"
          style={{ color: Colors.muted }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};
