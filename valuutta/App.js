import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {

  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState();
  const [conversion, setConversion] = useState();
  const [loading, setLoading] = useState(false);


  let myHeaders = new Headers();
  myHeaders.append("apikey", "kQS3vQQ2l1xd7nbbXc8M2fpOLDfAwTA6");

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const fetchData = () => {
    setLoading(true);


    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${amount}`, requestOptions)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);

        return response.json();
      }).then(result => {
        console.log(result);
        setConversion(result.result);
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}

        <Text style={{marginBottom: 80, fontSize: 24, fontFamily: "extrabold"}}>
          {conversion ? conversion + " €" : 'Conversion result will appear here'}
        </Text>

        <View style={{ width: '80%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <TextInput
            style={styles.textInput}
            placeholder='Amount'
            onChangeText={amount => setAmount(amount)}
          />
          <Text>
            {selectedCurrency}
          </Text>
          <Picker
            style={{ width: '20%' }}
            selectedValue={selectedCurrency}
            onValueChange={(itemValue) =>
              setSelectedCurrency(itemValue)
            }>
            <Picker.Item label="US Dollar (USD)" value="USD" />
            <Picker.Item label="British Pound (GBP)" value="GBP" />
            <Picker.Item label="Japanese Yen (JPY)" value="JPY" />
            <Picker.Item label="Swiss Franc (CHF)" value="CHF" />
            <Picker.Item label="Canadian Dollar (CAD)" value="CAD" />
            <Picker.Item label="Australian Dollar (AUD)" value="AUD" />
            <Picker.Item label="Swedish Krona (SEK)" value="SEK" />
            <Picker.Item label="Norwegian Krone (NOK)" value="NOK" />
            <Picker.Item label="Chinese Yuan (CNY)" value="CNY" />
            <Picker.Item label="Indian Rupee (INR)" value="INR" />
            <Picker.Item label="Russian Ruble (RUB)" value="RUB" />
            <Picker.Item label="Brazilian Real (BRL)" value="BRL" />
            <Picker.Item label="South African Rand (ZAR)" value="ZAR" />
            <Picker.Item label="Mexican Peso (MXN)" value="MXN" />
            <Picker.Item label="Singapore Dollar (SGD)" value="SGD" />
            <Picker.Item label="Hong Kong Dollar (HKD)" value="HKD" />
            <Picker.Item label="New Zealand Dollar (NZD)" value="NZD" />
            <Picker.Item label="Turkish Lira (TRY)" value="TRY" />
            <Picker.Item label="South Korean Won (KRW)" value="KRW" />
          </Picker>
        </View>
        <Button
          title='Convert'
          onPress={() => fetchData()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    padding: 3,
    minWidth: "25%",
    marginHorizontal: 5,
  },
});