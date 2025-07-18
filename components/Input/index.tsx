import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";

interface InputProps extends TextInputProps {
  label?: string;
}

const Input = ({ label, style, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{ marginBottom: 18 }}>
      {label && (
        <Text
          style={{
            marginBottom: 6,
            fontWeight: "600",
            fontSize: 15,
            color: "#333",
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          {
            backgroundColor: "#F7FAFC",
            borderWidth: 1,
            borderColor: isFocused ? "#3385FF" : "#E2E8F0",
            borderRadius: 10,
            paddingLeft: 16,
            paddingVertical: Platform.OS === "ios" ? 14 : 10,
            fontSize: 16,
            color: "#222",
            shadowColor: "#3385FF",
            shadowOpacity: isFocused ? 0.08 : 0,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: isFocused ? 2 : 0,
          },
          style,
        ]}
        placeholderTextColor="#A0AEC0"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
