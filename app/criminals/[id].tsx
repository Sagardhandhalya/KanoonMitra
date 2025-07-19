import {
  Pressable,
  StyleSheet,
  View,
  Image,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
import { supabase } from "@/utils/supabase";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Box from "@/components/Box";
import { useAppTheme } from "@/hooks/useAppTheme";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

const Details = () => {
  const [data, setData] = useState<ICriminal | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useAppTheme();
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("criminals")
        .select("*")
        .eq("id", id)
        .single();
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [id])
  );

  const handleDelete = async () => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleteLoading(true);
            const { error } = await supabase
              .from("criminals")
              .delete()
              .eq("id", id);
            setDeleteLoading(false);
            if (error) {
              Toast.show({
                type: "error",
                text1: "Delete failed",
                text2: error.message,
              });
            } else {
              router.replace("/criminals");
            }
          },
        },
      ]
    );
  };

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.bg100,
        }}
      >
        <Text variant="p">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.card }}
      contentContainerStyle={{ alignItems: "stretch", padding: 20 }}
    >
      <Box br={18} width="100%" mb={24}>
        <Pressable onPress={() => router.back()} style={{ marginBottom: 18 }}>
          <Text color={theme.primary100} fw="700">
            ← Back
          </Text>
        </Pressable>

        <View style={{ alignItems: "center", marginBottom: 18 }}>
          {data.avatar_url ? (
            <Image
              source={{ uri: data.avatar_url }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                marginBottom: 12,
                backgroundColor: theme.bg200,
              }}
              onError={() => {
                console.log("Failed to load image:", data.avatar_url);
              }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: theme.bg200,
                marginBottom: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text color={theme.text200}>No Image</Text>
            </View>
          )}
          <Text variant="h3" center mt={8} mb={6}>
            {data.full_name}
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text variant="h4" color={theme.text100} fs={16}>
            Address
          </Text>
          <Text variant="p" color={theme.text100} fs={16} lh={22}>
            {data.address}
          </Text>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text variant="h4" color={theme.text100}>
            Note
          </Text>
          <Text variant="p" color={theme.text100} fs={16} lh={22}>
            {data.note}
          </Text>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text variant="h4" color={theme.text100}>
            Guna Register No.
          </Text>
          <Text variant="p" color={theme.text100} fs={16} lh={22}>
            {data.dhara_no}
          </Text>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text variant="h4" color={theme.text100}>
            Created At
          </Text>
          <Text variant="p" color={theme.text100} fs={16} lh={22}>
            {new Date(data.created_at).toLocaleString()}
          </Text>
        </View>
        <Box horizontal gap={16} mt={24}>
          <Button
            label="View on Map"
            onPress={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lon}`;
              Linking.openURL(url);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
            iconLeft={
              <Ionicons
                name="map"
                size={20}
                color={theme.bg300}
                style={{ marginRight: 8 }}
              />
            }
          />
          <Button
            label="Delete Record"
            onPress={handleDelete}
            style={{
              backgroundColor: theme.error,

              flex: 1,
            }}
            loading={deleteLoading}
            disabled={deleteLoading}
          />
        </Box>
        <Button
          label="Edit"
          onPress={() =>
            router.push({ pathname: "/criminals/[id]/edit", params: { id } })
          }
          style={{ marginTop: 18, backgroundColor: theme.primary100 }}
          iconLeft={
            <Ionicons
              name="create-outline"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
          }
        />
      </Box>
    </ScrollView>
  );
};

export default Details;
