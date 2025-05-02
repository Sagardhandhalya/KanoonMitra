import { supabase } from "@/utils/supabase";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Text from "@/components/Text";
import Input from "@/components/Input";
import Box from "@/components/Box";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/hooks/useAppTheme";
import Button from "@/components/Button";
import { router } from "expo-router";

import { useState } from "react";

const AddPerson = () => {
  const { primary100 } = useAppTheme();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    note: "",
    latitude: "",
    longitude: "",
    gunaRegisterNumber: "",
    image: null,
  });

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    try {
      if (result.assets && result.assets[0]) {
        const { fileName, mimeType, uri } = result.assets[0];
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
        console.log(`https://lhkifzhuqfwxqenxgplr.supabase.co/storage/v1/object/public/files/${fileName}`, "====uri");
        setFormData((pre) => {
          return {
            ...pre,
            image: `https://lhkifzhuqfwxqenxgplr.supabase.co/storage/v1/object/public/files/${fileName}`,
          };
        });
        console.log(result.assets[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
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
      const { data, error } = await supabase.from("criminals").insert(payload);
      router.replace("/criminals");
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        console.log("Location permission not granted");
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
    }
  };

  return (
    <Box>
      <TouchableOpacity style={{ marginLeft: 12, marginTop: 8 }} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={32} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <Box justify="center" align="center">
          <TouchableOpacity
            style={{
              width: 100,
              marginVertical: 16,
              height: 100,
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 50,
            }}
            onPress={handleUploadImage}
          >
            {formData.image ? (
              <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: formData?.image }} />
            ) : (
              <Box align="center" justify="center" flex={1}>
                <Ionicons color={primary100} name="cloud-upload" size={32} />
                <Text color={primary100}>Upload</Text>
              </Box>
            )}
          </TouchableOpacity>
        </Box>
        <Box mb={16}>
          <Text variant="h4" mb={8}>
            Enter full name
          </Text>
          <Input
            placeholder="full name"
            value={formData.fullName}
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, fullName: text }))}
          />
        </Box>
        <Box mb={16}>
          <Text variant="h4" mb={8}>
            Enter address
          </Text>
          <Input
            placeholder="address"
            value={formData.address}
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, address: text }))}
          />
        </Box>
        <Box mb={16}>
          <Text variant="h4" mb={8}>
            Enter note
          </Text>
          <Input
            placeholder="write whatever you want..."
            multiline
            numberOfLines={5}
            value={formData.note}
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, note: text }))}
          />
        </Box>
        <Button label="Fill location" onPress={handleLocation} />
        <Box mb={16}>
          <Text variant="h4" mb={8}>
            Enter letitude
          </Text>
          <Input
            placeholder="ex: 72.0008"
            keyboardType="number-pad"
            value={formData.latitude}
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, latitude: text }))}
          />
        </Box>
        <Box mb={16}>
          <Text variant="h4" mb={8}>
            Enter longitude
          </Text>
          <Input
            placeholder="ex:89.0008"
            keyboardType="number-pad"
            value={formData.longitude}
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, longitude: text }))}
          />
        </Box>
        <Box mb={16}>
          <Text variant="h4" mb={8}>
            Enter Guna register number
          </Text>
          <Input
            placeholder="ex:550"
            value={formData.gunaRegisterNumber}
            onChangeText={(text) => setFormData((prevState) => ({ ...prevState, gunaRegisterNumber: text }))}
          />
        </Box>
        <Button label="Submit" onPress={handleSubmit} />
      </ScrollView>
    </Box>
  );
};

export default AddPerson;
