import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { parseStyleAttributes, StyleAttributes } from "@/utils";

interface BoxProps {
  children: React.ReactNode;
}

const Box: React.FC<BoxProps & StyleAttributes> = ({ children, ...rest }) => {
  let finalStyle = parseStyleAttributes(rest);
  return <View style={finalStyle}>{children}</View>;
};

export default Box;

const styles = StyleSheet.create({});
