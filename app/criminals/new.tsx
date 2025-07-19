import { supabase } from "@/utils/supabase";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Box from "@/components/Box";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/hooks/useAppTheme";
import Button from "@/components/Button";
import { router } from "expo-router";

import { useState, useEffect } from "react";
import * as Location from "expo-location";
import Toast from "react-native-toast-message";

interface CriminalFormProps {
  initialValues?: Partial<{
    fullName: string;
    address: string;
    note: string;
    latitude: string;
    longitude: string;
    gunaRegisterNumber: string;
    image: string | null;
    imagePreview: string | null;
  }>;
  onSubmit?: (
    values: any,
    helpers: { setLoading: (v: boolean) => void }
  ) => Promise<void>;
  submitLabel?: string;
}

export const CriminalForm: React.FC<CriminalFormProps> = ({
  initialValues,
  onSubmit,
  submitLabel,
}) => {
  const { primary100, bg100 } = useAppTheme();
  const [formData, setFormData] = useState({
    fullName: initialValues?.fullName || "",
    address: initialValues?.address || "",
    note: initialValues?.note || "",
    latitude: initialValues?.latitude || "",
    longitude: initialValues?.longitude || "",
    gunaRegisterNumber: initialValues?.gunaRegisterNumber || "",
    image: initialValues?.image || null,
    imagePreview: initialValues?.imagePreview || null,
  });
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        fullName: initialValues.fullName || "",
        address: initialValues.address || "",
        note: initialValues.note || "",
        latitude: initialValues.latitude || "",
        longitude: initialValues.longitude || "",
        gunaRegisterNumber: initialValues.gunaRegisterNumber || "",
        image: initialValues.image || null,
        imagePreview: initialValues.imagePreview || null,
      });
    }
  }, [JSON.stringify(initialValues)]);

  const handleUploadImage = async () => {
    setImageLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    try {
      if (result.assets && result.assets[0]) {
        const { fileName, mimeType, uri } = result.assets[0];
        // Show local preview immediately
        setFormData((pre) => ({
          ...pre,
          imagePreview: uri,
        }));
        // Upload to Supabase
        const file = await supabase.storage.from("files").upload(
          fileName,
          {
            name: fileName,
            type: mimeType,
            uri: uri,
          },
          {
            contentType: mimeType,
          }
        );
        setFormData((pre) => ({
          ...pre,
          image: `https://lhkifzhuqfwxqenxgplr.supabase.co/storage/v1/object/public/files/${fileName}`,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Validate required fields
    if (!formData.fullName || !formData.address) {
      Toast.show({
        type: "error",
        text1: "Full name and address are required.",
      });
      setLoading(false);
      return;
    }

    const payload = {
      address: formData.address,
      avatar_url: formData.image,
      dhara_no: formData.gunaRegisterNumber,
      full_name: formData.fullName,
      lat: parseFloat(formData.latitude) || 0,
      lon: parseFloat(formData.longitude) || 0,
      note: formData.note || "Default Note",
      pincode: "364140",
    };

    try {
      const { data, error } = await supabase
        .from("criminals")
        .insert([payload])
        .select();
      if (error) {
        console.log(error.message);

        console.log("Insert error:", error);
        Toast.show({
          type: "error",
          text1: "Insert error",
          text2: error.message || "An error occurred while adding the record.",
        });
      } else {
        router.replace("/criminals");
      }
    } catch (error) {
      console.log("Unexpected error:", error);
      Toast.show({
        type: "error",
        text1: "Unexpected error",
        text2: (error as Error).message || "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = async () => {
    setLocationLoading(true);
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log("Location permission not granted");
        setLocationLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setFormData((prevState) => ({
        ...prevState,
        latitude: location.coords.latitude.toString(),
        longitude: location.coords.longitude.toString(),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleFormSubmit = async () => {
    if (onSubmit) {
      await onSubmit(formData, { setLoading });
    } else {
      await handleSubmit();
    }
  };

  return (
    <Box bg="#fff">
      <TouchableOpacity
        style={{ marginLeft: 12, marginTop: 8 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={32} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 32,
          alignItems: "stretch",
          minHeight: "100%",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Box justify="center" align="center" mb={18}>
          <TouchableOpacity
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
              borderWidth: 2,
              borderColor: "#3385FF",
              borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              marginBottom: 10,
              shadowColor: "#3385FF",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
            onPress={handleUploadImage}
            disabled={imageLoading}
          >
            {imageLoading ? (
              <ActivityIndicator size="small" color={primary100} />
            ) : formData.imagePreview ? (
              <Image
                style={{ width: 106, height: 106, borderRadius: 53 }}
                source={{ uri: String(formData.imagePreview || "") }}
              />
            ) : (
              <Box align="center" justify="center" flex={1}>
                <Ionicons color={primary100} name="cloud-upload" size={36} />
                <Text color={primary100} mt={6}>
                  Upload Photo
                </Text>
              </Box>
            )}
          </TouchableOpacity>
        </Box>
        <Input
          label="Full Name"
          placeholder="Enter full name"
          value={formData.fullName}
          onChangeText={(text) =>
            setFormData((prevState) => ({ ...prevState, fullName: text }))
          }
        />
        <Input
          label="Address"
          placeholder="Enter address"
          value={formData.address}
          multiline
          onChangeText={(text) =>
            setFormData((prevState) => ({ ...prevState, address: text }))
          }
          numberOfLines={3}
        />
        <Input
          label="Note"
          placeholder="Write whatever you want..."
          multiline
          numberOfLines={5}
          value={formData.note}
          onChangeText={(text) =>
            setFormData((prevState) => ({ ...prevState, note: text }))
          }
        />

        {formData.latitude && (
          <Input
            label="Latitude"
            placeholder="ex: 72.0008"
            keyboardType="number-pad"
            value={formData.latitude}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, latitude: text }))
            }
          />
        )}
        {formData.longitude && (
          <Input
            label="Longitude"
            placeholder="ex: 89.0008"
            keyboardType="number-pad"
            value={formData.longitude}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, longitude: text }))
            }
          />
        )}
        <Button
          label="Fill location"
          onPress={handleLocation}
          style={{ marginBottom: 10, marginTop: 2 }}
          loading={locationLoading}
          disabled={locationLoading}
        />
        <Input
          label="Guna Register Number"
          multiline
          numberOfLines={3}
          placeholder="2324/2002,1002/2322"
          value={formData.gunaRegisterNumber}
          onChangeText={(text) =>
            setFormData((prevState) => ({
              ...prevState,
              gunaRegisterNumber: text,
            }))
          }
        />
        <Button
          label={submitLabel || "Submit"}
          onPress={handleFormSubmit}
          style={{ marginTop: 18, width: "100%" }}
          loading={loading}
          disabled={loading}
        />
      </ScrollView>
    </Box>
  );
};

const AddPerson = () => <CriminalForm />;
export default AddPerson;
