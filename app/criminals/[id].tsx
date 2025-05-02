import { Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";
import Text from "@/components/Text";

const details = () => {
  const [data, setData] = useState<ICriminal | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();

  const { full_name } = data || {};

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from("criminals").select("*").eq("id", id).single();
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <View>
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Text>Back {id}</Text>
        <Text variant="h1">{full_name}</Text>
      </Pressable>
      <Text>details</Text>
    </View>
  );
};

export default details;

const styles = StyleSheet.create({});
