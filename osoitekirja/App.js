import { app } from './firebaseConfig';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getDatabase, ref, push } from "firebase/database";

export default function App() {

  const database = getDatabase(app);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working something</Text>
      <StatusBar style="auto" />
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
