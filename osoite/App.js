import { useState } from 'react';
import { StyleSheet, Button, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [query, setQuery] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: 60.1674881,
    longitude: 24.9427473,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })

  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const URI = `https://geocode.maps.co/search?q=${query}&api_key=${apiKey}`

  const buttonPressed = () => {

    fetch(URI)
      .then(response => response.json())
      .then(data => {
        setCoordinates({
          latitude: Number(data[0].lat),
          longitude: Number(data[0].lon),
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        });
      })
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <MapView
        style={{ width: '100%', height: '80%' }}
        region={coordinates}>
        <Marker
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          }}
        />
      </MapView>
      <View style={{
        width: '95%'
      }}>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 10,
            marginVertical: 10,
            borderRadius: 5,
          }}
          placeholder='Hae'
          inputMode='search'
          onChangeText={location => setQuery(location)}
          value={query}
        />
        <Button
          onPress={buttonPressed}
          title="Show" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
