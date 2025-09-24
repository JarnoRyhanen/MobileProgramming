import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

export default function App() {

  const [product, setProduct] = useState(({
    product: "",
    amount: ""
  }));
  const [products, setProducts] = useState([]);
  const database = getDatabase(app);

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setProducts(productsArray);
      } else {
        setProducts([]);
      }
    })
  }, []);

  const saveItem = () => {
    if (product.amount && product.product) {
      push(ref(database, 'items/'), product);
      setProduct({ product: "", amount: "" });
    }
    else {
      alert("Error", "Type product and amount first");
    }
  };

  const deleteItem = (id) => {
    console.log("Deleting item with id:", id);
    remove(ref(database, `items/${id}`));
  }

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.textInput}
        placeholder='Product'
        onChangeText={(productValue) => setProduct({ ...product, product: productValue })}
        value={product.product}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Amount'
        onChangeText={(amountValue) => setProduct({ ...product, amount: amountValue })}
        value={product.amount}
      />
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Button
          title='save'
          onPress={() => saveItem()}
        />
      </View>

      <Text style={{ fontWeight: "bold", margin: 20 }}>Shopping list</Text>

      <FlatList
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <View style={{ width: "80%", flexDirection: 'row' }}>
            <Text>{item.product}, </Text>
            <Text>{item.amount}  </Text>
            <Text style={{ color: 'blue' }} onPress={() => deleteItem(item.id)}>Delete</Text>
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
