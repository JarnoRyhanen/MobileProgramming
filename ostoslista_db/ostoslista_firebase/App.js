import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { app } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { Input, Button, Icon, ListItem, Header } from '@rneui/themed';

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
      console.log("OLEN TÄÄLLÄ");
      
    }
    else {
      alert("Type product and amount first");
    }
  };

  const deleteItem = (id) => {
    console.log("Deleting item with id:", id);
    remove(ref(database, `items/${id}`));
  }

  return (
    <View style={styles.container}>

      <Header
        barStyle="default"
        centerComponent={{
          text: "Shopping list",
          style: { color: "#fff" }
        }}
        containerStyle={{ width: "auto", height: 50 }}
        placement="center"
      />

      <Input
        label="PRODUCT"
        placeholder='Product'
        value={product.product}
        onChangeText={(productValue) => setProduct({ ...product, product: productValue })}
      />
      <Input
        label="AMOUNT"
        placeholder='Amount'
        value={product.amount}
        onChangeText={(amountValue) => setProduct({ ...product, amount: amountValue })}
      />

      <Button radius={"sm"} type="solid" onPress={() => saveItem()}>
        Save
        <Icon name="Save" type='material' color="white" />
      </Button>

      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        data={products}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 12 }}>No items</Text>}
        renderItem={({ item }) =>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.product}</ListItem.Title>
              <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon name="Delete" type='material' color="red" onPress={() => deleteItem(item.id)} />
          </ListItem>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
  }
});
