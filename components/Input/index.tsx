import { Platform, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import React from "react";

const Input = (props: TextInputProps) => {
  const styles = {
    borderWidth: 1,
    paddingLeft: 16,
    borderRadius: 8,
    paddingVertical: Platform.OS === "ios" ? 12 : 0,
  } as TextStyle;
  return <TextInput style={styles} {...props} />;
};

export default Input;

const styles = StyleSheet.create({});
