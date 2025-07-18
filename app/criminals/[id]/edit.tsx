import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router, useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";
import { CriminalForm } from "./../new";
import { View, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";

const EditCriminal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("criminals")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        Toast.show({
          type: "error",
          text1: "Error loading record",
          text2: error.message,
        });
        setLoading(false);
        return;
      }
      setInitialValues({
        fullName: data.full_name,
        address: data.address,
        note: data.note,
        latitude: String(data.lat),
        longitude: String(data.lon),
        gunaRegisterNumber: data.dhara_no,
        image: data.avatar_url,
        imagePreview: data.avatar_url,
      });
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (
    values: any,
    { setLoading }: { setLoading: (v: boolean) => void }
  ) => {
    setLoading(true);
    const payload = {
      address: values.address,
      avatar_url: values.image,
      dhara_no: values.gunaRegisterNumber,
      full_name: values.fullName,
      lat: parseFloat(values.latitude) || 0,
      lon: parseFloat(values.longitude) || 0,
      note: values.note || "Default Note",
      pincode: "364140",
    };
    const { error } = await supabase
      .from("criminals")
      .update(payload)
      .eq("id", id);
    setLoading(false);
    if (error) {
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: error.message,
      });
    } else {
      router.replace({ pathname: "/criminals/[id]", params: { id } });
    }
  };

  if (loading || !initialValues) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <CriminalForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      submitLabel="Update"
    />
  );
};

export default EditCriminal;
