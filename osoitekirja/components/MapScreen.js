import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
    const { address } = route.params;
    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const URI = `https://geocode.maps.co/search?q=${address}&api_key=${apiKey}`

    useEffect(() => {
        console.log(address);

        fetch(URI)
            .then(response => response.json())
            .then(data => {
                setCoordinates({
                    ...coordinates,
                    latitude: Number(data[0].lat),
                    longitude: Number(data[0].lon),
                });
            })
    }, []);

    return (
        <>
            <MapView
                style={{ width: '100%', height: '100%' }}
                region={coordinates}>
                <Marker
                    coordinate={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude
                    }}
                    title={address}
                />
            </MapView>
        </>
    );
}

