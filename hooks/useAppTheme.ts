import { Colors } from "@/constants/Colors";

export const useAppTheme = () => {
  // In future if we include dark mode add conditon here for swaping colors
  const colors = Colors.light;
  return colors;
};
