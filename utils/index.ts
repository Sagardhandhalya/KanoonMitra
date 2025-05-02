import { DimensionValue, TextStyle, ViewStyle } from "react-native";

export interface StyleAttributes {
  m?: [number?, number?, number?, number?];
  p?: [number?, number?, number?, number?];
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  mh?: number;
  mv?: number;
  ph?: number;
  pv?: number;
  br?: number;
  bg?: string;
  margin?: number;
  padding?: number;
  borderColor?: string;
  width?: DimensionValue;
  height?: DimensionValue;
  flex?: number;
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  gap?: number;
  alignSelf?: "auto" | "flex-start" | "center" | "flex-end";
  horizontal?: boolean;
}

export const ifNullOrUndefined = (value: any): boolean => {
  return value === null || value === undefined;
};

export const parseStyleAttributes = ({
  m = [],
  p = [],
  mt: _mt,
  mr: _mr,
  mb: _mb,
  ml: _ml,
  pt: _pt,
  pr: _pr,
  pb: _pb,
  pl: _pl,
  mh,
  mv,
  br,
  bg,
  ph,
  pv,
  margin,
  borderColor,
  padding,
  width,
  height,
  flex,
  align,
  justify,
  alignSelf,
  gap,
  horizontal,
}: StyleAttributes): Record<string, any> => {
  const [mt = _mt, mr = _mr, mb = _mb, ml = _ml] = m;
  const [pt = _pt, pr = _pr, pb = _pb, pl = _pl] = p;

  const obj = {
    margin,
    padding,
    marginHorizontal: mh,
    marginVertical: mv,
    marginTop: mt,
    marginRight: mr,
    marginBottom: mb,
    marginLeft: ml,
    paddingTop: pt,
    paddingRight: pr,
    paddingBottom: pb,
    paddingLeft: pl,
    borderRadius: br,
    backgroundColor: bg,
    paddingHorizontal: ph,
    paddingVertical: pv,
    borderColor,
    width,
    height,
    flex,
    alignItems: align,
    justifyContent: justify,
    alignSelf,
    gap,
    flexDirection: horizontal ? "row" : "column",
  } as ViewStyle & TextStyle;

  const final: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    if (obj[key] != null) {
      // @ts-ignore
      final[key] = obj[key];
    }
  });

  return final;
};
