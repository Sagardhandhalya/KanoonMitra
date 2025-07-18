import React, { useState } from "react";
import {
  Image as RNImage,
  ImageProps,
  View,
  ActivityIndicator,
} from "react-native";
import Text from "@/components/Text";
import { useAppTheme } from "@/hooks/useAppTheme";
import { validateImageUrl } from "@/utils";

interface CustomImageProps extends Omit<ImageProps, "source"> {
  uri?: string | null;
  fallbackText?: string;
  showError?: boolean;
  size?: number;
  borderRadius?: number;
}

const CustomImage: React.FC<CustomImageProps> = ({
  uri,
  fallbackText = "No Image",
  showError = false,
  size = 120,
  borderRadius = 60,
  style,
  onError,
  ...props
}) => {
  const { bg200, text200 } = useAppTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoadStart = () => {
    setLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    if (onError) {
      onError();
    }
  };

  // If no URI or invalid URI, show fallback
  if (!uri || !validateImageUrl(uri)) {
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: borderRadius,
            backgroundColor: bg200,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
      >
        <Text color={text200} center>
          {fallbackText}
        </Text>
      </View>
    );
  }

  // If there was an error loading the image
  if (error) {
    return (
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: borderRadius,
            backgroundColor: bg200,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
      >
        <Text color={text200} center>
          {showError ? "Failed to load" : fallbackText}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ position: "relative" }}>
      <RNImage
        source={{ uri }}
        style={[
          {
            width: size,
            height: size,
            borderRadius: borderRadius,
            backgroundColor: bg200,
          },
          style,
        ]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        resizeMode="cover"
        {...props}
      />
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: bg200,
            borderRadius: borderRadius,
          }}
        >
          <ActivityIndicator size="small" />
        </View>
      )}
    </View>
  );
};

export default CustomImage;
