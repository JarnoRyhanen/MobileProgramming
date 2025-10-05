import { StyleSheet, Text, View, Button, FlatList, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';


export default function App() {

  const [contacts, setContacts] = useState([]);
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );

      if (data.length > 0) {
        setContacts(data);
      }
      else {
        Alert.alert("Warning", "No contacts found.");
      }
    }
  }


  return (
    <View style={styles.container}>

      {contacts.length === 0 ? (
        <Text style={{ marginTop: 20 }}>No contacts loaded</Text>
      ) : (
        <FlatList
          style={{ paddingVertical: 80 }}
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const phone = item.phoneNumbers ? item.phoneNumbers[0].number : '';
            return (
              <View style={styles.listView}>
                <Text>{item.name}</Text>
                <Text>{phone}</Text>
              </View>
            );
          }}
        />
      )}
      <Button title="Get Contacts" onPress={getContacts} />
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
  listView: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: 'space-around',
    marginVertical: 3,
    width: "100%",
  }
});
