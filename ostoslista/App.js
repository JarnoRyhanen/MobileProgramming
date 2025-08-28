import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {

  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  const onButtonPressed = (button) => () => {
    switch (button) {
      case "Add":
        setItems([...items, {key: item}]);
        setItem("");
        break;

      case "Clear":
        setItems([]);
        break;
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.textInput}
        placeholder='Add item'
        onChangeText={(item) => setItem(item)}
        value={item}
      />
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Button
          title='Add'
          onPress={onButtonPressed("Add")}
        />
        <Button
          title='Clear'
          onPress={onButtonPressed("Clear")}
        />
      </View>

      <Text style={{fontWeight: "bold", color: "blue", margin: 20}}>Shopping list</Text>
      <FlatList 
      data={items}
      renderItem={({item}) => <Text>{item.key}</Text>}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    border: 1,
    borderWidth: 1,
    borderColor: "Gray",
    width: "60%"
  }
});
