import { app } from '../firebaseConfig';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { Input, Button, ListItem } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

export default function MyPlacesScreen({ navigation }) {

    const database = getDatabase(app);

    const [address, setAddress] = useState("");
    const [addresses, setAddresses] = useState([]);

    const handleSave = () => {
        if (address) {
            push(ref(database, 'items/'), address);
            setAddress("");
        }
        else {
            Alert.alert("Error", "Type address first");
        }
    }

    useEffect(() => {
        const itemsRef = ref(database, 'items/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({
                    id: key,
                    value: data[key],
                }));
                setAddresses(list);
            } else {
                setAddresses([]);
            }
        })
    }, []);

    return (
        <View style={styles.container}>

            <Input
                label="PLACEFINDER"
                placeholder='Type in address'
                value={address}
                onChangeText={(value) => setAddress(value)}
            />

            <Button
                radius={"sm"}
                titleStyle={{ marginHorizontal: 10 }}
                buttonStyle={{ width: 350 }}
                onPress={() => handleSave()}
            >
                <MaterialIcons name="save" size={24} color="white" />
                Save
            </Button>

            <FlatList
                style={{ width: '100%' }}
                contentContainerStyle={{ paddingBottom: 10 }}
                data={addresses}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 12, fontSize: 20 }}>No addresses</Text>}
                renderItem={({ item }) =>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title
                                style={styles.address}
                                numberOfLines={1}
                                ellipsizeMode='tail'
                            >
                                {item.value}
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Title
                            style={{
                                color: '#999', fontSize: 12, marginLeft: 8,
                            }}
                        >Show on map</ListItem.Title>
                        <MaterialIcons name="chevron-right" size={24} color="#999" />
                    </ListItem>
                }
            />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingHorizontal: 12,
    },
    address: {
        maxWidth: '75%',
    },
});