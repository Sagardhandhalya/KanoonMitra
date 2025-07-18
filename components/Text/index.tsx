import { StyleSheet, Text as RNText, TextStyle, View } from "react-native";
import React from "react";
import { parseStyleAttributes, StyleAttributes } from "@/utils";
interface TextComponentProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: React.ReactNode;
  center?: boolean;
  fs?: number;
  fw?: TextStyle["fontWeight"];
  lh?: number;
  color?: string;
}

const Text: React.FC<TextComponentProps & StyleAttributes> = ({
  variant = "p",
  fs,
  fw,
  lh,
  color,
  center,
  children,
  ...rest
}) => {
  const textStyles = {
    h1: {
      fontSize: 32,
      fontWeight: "900",
      lineHeight: 40,
      fontFamily: "Roboto_900Black",
      color: "#22223b",
    } as TextStyle,
    h2: {
      fontSize: 24,
      fontWeight: "800",
      lineHeight: 30,
      fontFamily: "Roboto_700Bold",
      color: "#22223b",
    },
    h3: {
      fontSize: 20,
      fontWeight: "700",
      lineHeight: 25,
      fontFamily: "Roboto_700Bold",
      color: "#22223b",
    },
    h4: {
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 20,
      fontFamily: "Roboto_500Medium",
    },
    h5: {
      fontSize: 13,
      fontWeight: "600",
      lineHeight: 18,
      fontFamily: "Roboto_500Medium",
    },
    h6: {
      fontSize: 10,
      fontWeight: "500",
      lineHeight: 15,
      fontFamily: "Roboto_500Medium",
    },
    p: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 20,
      fontFamily: "Roboto_400Regular",
    },
  };

  const layoutStyles = parseStyleAttributes(rest);
  let finalStyle = { ...textStyles[variant], ...layoutStyles } as TextStyle;

  if (fs) {
    finalStyle = { ...finalStyle, fontSize: fs };
  }
  if (fw) {
    finalStyle = { ...finalStyle, fontWeight: fw };
    // Set fontFamily based on weight if not overridden by fs
    if (fw === "900") finalStyle.fontFamily = "Roboto_900Black";
    else if (fw === "700" || fw === "800")
      finalStyle.fontFamily = "Roboto_700Bold";
    else if (fw === "600" || fw === "500")
      finalStyle.fontFamily = "Roboto_500Medium";
    else finalStyle.fontFamily = "Roboto_400Regular";
  }
  if (lh) {
    finalStyle = { ...finalStyle, lineHeight: lh };
  }
  if (color) {
    finalStyle = { ...finalStyle, color };
  }

  if (center) {
    finalStyle = { ...finalStyle, textAlign: center ? "center" : "auto" };
  }

  return <RNText style={finalStyle}>{children}</RNText>;
};

export default Text;
