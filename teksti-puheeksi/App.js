import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import * as Speech from 'expo-speech';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

export default function App() {

  const [sentence, setSentence] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const speak = () => {

    let language;
    switch (selectedIndex) {
      case 0:
        language = "EN"
        break;
      case 1:
        language = "FI"
        break;
      case 2:
        language = "SWE"
        break;
    }

    Speech.speak(sentence, {
      language: language
    });
  };

  return (
    <View style={styles.container}>

      <SegmentedControl
        values={['English', 'Finnish', 'Swedish']}
        selectedIndex={selectedIndex}
        onChange={(event) => setSelectedIndex(event.nativeEvent.selectedSegmentIndex)}
        style={{ width: 300, marginBottom: 12 }}
      />

      <TextInput
        style={{
          borderWidth: 1,
          padding: 3,
          margin: 10,
          height: 40,
          width: '80%',
          borderRadius: 5,
        }}
        placeholder='Type something here...'
        onChangeText={value => setSentence(value)}
        value={sentence}
      />

      <Button title="Say it" onPress={speak} />
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
