import { app } from '../firebaseConfig';
import { getDatabase, ref, push } from "firebase/database";
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function MyPlacesScreen({ navigation }) {

    const database = getDatabase(app);

    return (
        <View style={styles.container}>
            <Text>My Places</Text>
        </View>
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