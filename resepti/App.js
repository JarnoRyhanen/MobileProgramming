import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList, TextInput, ActivityIndicator } from 'react-native';

export default function App() {

  const URI = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const findRecipe = () => {
    setLoading(true);

    fetch(`${URI}${query}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);

        return response.json();
      })
      .then(data => setData(data.meals))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Ingredient'
        onChangeText={query => setQuery(query)}
        value={query}
      />
      <View style={styles.button}>
        <Button
          title='Find'
          onPress={() => findRecipe()}
        />
      </View>
      {loading && <ActivityIndicator size="large" />}

      <FlatList
        data={data}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) =>
          <View style={{padding: 10}}>
            <Text style={{ fontSize: 18 }}>
              {item.strMeal}
            </Text>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: item.strMealThumb }}
            />
            <View style={{margin: 10, borderWidth: 1, borderColor: "#c8c8c8ff"}}/>
          </View>}
      />
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
    marginTop: 100
  },
  textInput: {
    borderWidth: 1,
    padding: 3,
    height: 40,
    width: '50%',
    borderRadius: 5,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: 10
  }
});
