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
    h1: { fontSize: 32, fontWeight: "900", lineHeight: 40 } as TextStyle,
    h2: { fontSize: 24, fontWeight: "800", lineHeight: 30 },
    h3: { fontSize: 20, fontWeight: "700", lineHeight: 25 },
    h4: { fontSize: 16, fontWeight: "600", lineHeight: 20 },
    h5: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
    h6: { fontSize: 10, fontWeight: "500", lineHeight: 15 },
    p: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  };

  const layoutStyles = parseStyleAttributes(rest);
  let finalStyle = { ...textStyles[variant], ...layoutStyles } as TextStyle;

  if (fs) {
    finalStyle = { ...finalStyle, fontSize: fs };
  }
  if (fw) {
    finalStyle = { ...finalStyle, fontWeight: fw };
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
