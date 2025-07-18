import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import Text from "@/components/Text";

interface IButton extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
  style?: any;
  iconLeft?: React.ReactNode;
}
const Button = ({
  onPress,
  label,
  loading,
  style,
  disabled,
  iconLeft,
  ...rest
}: IButton) => {
  const { primary100 } = useAppTheme();
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: disabled ? "#b4bfcc" : primary100,
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {iconLeft && <View style={{ marginRight: 8 }}>{iconLeft}</View>}
          <Text color="#fff" center fw="700" fs={17}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
