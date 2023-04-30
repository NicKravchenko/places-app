import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";

function Map({ navigation, route }) {
  const markerLoc = route.params.loc
    ? {
        lat: route.params.loc.lat,
        lng: route.params.loc.lng,
      }
    : undefined;

  const isPickMode = route.params.mode === "pick" ? true : false;

  const [selectedLocation, setSelectedLocation] = useState(markerLoc);

  const initialLoc = route.params.loc
    ? { latitude: route.params.loc.lat, longitude: route.params.loc.lng }
    : { latitude: 37.78, longitude: -122.43 }; //Some default values

  const configLoc = route.params.loc
    ? { latitudeDelta: 0.0122, longitudeDelta: 0.0021 }
    : { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };

  const region = {
    ...initialLoc,
    ...configLoc,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked",
        "Please pick a location before saving.",
        [{ text: "Okay" }]
      );
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions(
      {
        headerRight: ({ tintColor }) =>
          isPickMode && (
            <IconButton
              icon="save"
              size={24}
              color={tintColor}
              onPress={savePickedLocationHandler}
            />
          ),
      },
      [navigation, savePickedLocationHandler]
    );
  });
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={isPickMode && selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
