import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [products, setProducts] = useState([]);

  const db = SQLite.openDatabaseSync('shoppingdb');

  const initialize = async () => {
    try {
      await db.execAsync(`
      CREATE TABLE IF NOT EXISTS shopping_list (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);
    `);
      await updateList();
    } catch (error) {
      console.error('Could not open database', error);
    }
  }

  useEffect(() => {
    initialize()
  }, []);

  const saveItem = async () => {
    try {
      await db.runAsync("INSERT INTO shopping_list (product, amount) VALUES(?, ?)", product, amount);
      await updateList();
    } catch (error) {
      console.error("Could not add an item to the shopping list", error);
    }
  };

  const updateList = async () => {
    try {
      const list = await db.getAllAsync("SELECT * from shopping_list");
      setProducts(list);
    } catch (error) {
      console.error("Could not get items", error);
    }
  }

  const deleteItem = async (id) => {
    try {
      await db.runAsync('DELETE FROM shopping_list WHERE id=?', id);
      await updateList();
    }
    catch (error) {
      console.error('Could not delete item', error);
    }
  }

  const deleteAll = async () => {
    try {
      await db.runAsync('DELETE FROM shopping_list');
      await updateList();
    } catch (error) {
      console.error("Could not delete the list", error);
    }
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.textInput}
        placeholder='Product'
        onChangeText={(product) => setProduct(product)}
        value={product}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Amount'
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Button
          title='save'
          onPress={() => saveItem()}
        />
        {/*      <Button
          title='Delete ALL'
          onPress={() => deleteAll()}
        /> */}
      </View>

      <Text style={{ fontWeight: "bold", margin: 20 }}>Shopping list</Text>

      <FlatList
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>
          <View style={{ width: "80%", flexDirection: 'row' }}>
            <Text>{item.product}, </Text>
            <Text>{item.amount}  </Text>
            <Text style={{ color: 'blue' }} onPress={() => deleteItem(item.id)}>Bought</Text>
          </View>
        }
        data={products}
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
    margin: 4,
    borderWidth: 1,
    borderColor: "Gray",
    width: "60%"
  }
});
