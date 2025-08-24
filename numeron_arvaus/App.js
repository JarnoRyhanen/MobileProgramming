import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const [guess, setGuess] = useState(null);
  const [tries, setTries] = useState(1);
  const [guessInformation, setGuessInformation] = useState("");
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);

  const guessButtonPressed = () => {

    if (guess === null || guess === "") {
      setGuessInformation("Guess cannot be empty");
      return;
    }

    setTries(tries + 1);
    if (guess < randomNumber) {
      setGuessInformation(`Your guess ${guess} is too low`);
    } else if (guess > randomNumber) {
      setGuessInformation(`Your guess ${guess} is too high`);
    } else {
      prompt(`You guessed the number in ${tries} guesses`);
      setGuess(null);
      setGuessInformation("");
      setTries(1);
      setRandomNumber(Math.floor(Math.random() * 100) + 1);
    }
  }

  return (
    <View style={styles.container}>
      {tries === 1 ? (
        <Text style={{ fontSize: 24 }}>Guess a number between 1-100</Text>
      ) : (
        <Text style={{ fontSize: 24 }}>{guessInformation}</Text>
      )}

      <TextInput
        style={{
          borderWidth: 1,
          padding: 3,
          margin: 10,
          height: 40,
          width: '50%',
          borderRadius: 5,
        }}
        placeholder='Make a guess'
        inputMode='numeric'
        onChangeText={value => setGuess(Number(value))}
        value={guess}
      />
      <Button onPress={guessButtonPressed} title="Make guess" />
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
