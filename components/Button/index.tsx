import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import Text from "@/components/Text";

interface IButton {
  label: string;
}
const Button = (props: TouchableOpacityProps & IButton) => {
  const { onPress, label } = props;
  const { primary200, bg200 } = useAppTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: primary200,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text color={bg200} center>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
