import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  Text as RNText,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { supabase } from "@/utils/supabase";
import * as Location from "expo-location";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

interface Criminal {
  id: string;
  full_name: string;
  lat: number;
  lon: number;
  avatar_url: string;
}

const DEFAULT_REGION = {
  latitude: 21.1702,
  longitude: 72.8311,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

const CriminalMapScreen = () => {
  const [criminals, setCriminals] = useState<Criminal[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState<Region | null>(null);
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCriminals = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("criminals")
          .select("id, full_name, lat, lon, avatar_url");
        if (!error && data) {
          setCriminals(data.filter((c: any) => c.lat && c.lon));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCriminals();
  }, []);

  useEffect(() => {
    if (criminals.length > 0) {
      setRegion({
        latitude: criminals[0].lat,
        longitude: criminals[0].lon,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      });
    } else {
      setRegion(DEFAULT_REGION);
    }
  }, [criminals]);

  const handleMarkerPress = (criminal: Criminal) => {
    setSelectedCriminal(criminal);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCriminal(null);
  };

  const handleViewDetails = () => {
    if (selectedCriminal) {
      setModalVisible(false);
      router.push(`/criminals/${selectedCriminal.id}`);
    }
  };

  return (
    <View style={styles.container}>
      {loading || !region ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation
          showsMyLocationButton
          zoomEnabled
          zoomControlEnabled
        >
          {criminals.map((criminal) => (
            <Marker
              key={criminal.id}
              coordinate={{ latitude: criminal.lat, longitude: criminal.lon }}
              title={criminal.full_name}
              onPress={() => handleMarkerPress(criminal)}
              anchor={{ x: 0.5, y: 1 }}
              style={{ height: 100, width: 100 }}
            >
              {criminal.avatar_url ? (
                <Image
                  source={{ uri: criminal.avatar_url }}
                  style={styles.markerImage}
                  resizeMode="stretch"
                />
              ) : (
                <View style={[styles.markerImage, styles.fallbackInitial]}>
                  <RNText style={styles.fallbackText}>
                    {criminal.full_name.slice(0, 1)}
                  </RNText>
                </View>
              )}
            </Marker>
          ))}
        </MapView>
      )}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedCriminal && (
              <>
                <Image
                  source={{ uri: selectedCriminal.avatar_url }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <RNText style={styles.modalName}>
                  {selectedCriminal.full_name}
                </RNText>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={handleViewDetails}
                >
                  <RNText style={styles.detailsButtonText}>View Details</RNText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <RNText style={styles.closeButtonText}>Close</RNText>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markerImage: {
    width: 72,
    height: 72,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#eee",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackInitial: {
    backgroundColor: "#ddd",
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    width: 280,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#eee",
    backgroundColor: "#eee",
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
  },
  detailsButton: {
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  detailsButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default CriminalMapScreen;
