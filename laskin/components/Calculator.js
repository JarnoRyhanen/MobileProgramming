import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';

const Calculator = ({ navigation }) => {

    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    const additionPressed = () => {
        const result = value1 + value2;
        const value = `${value1} + ${value2} = ${result}`
        setHistory([...history, { key: value }]);
        setResult(result);
        setValue1("");
        setValue2("");
    }

    const substractionPressed = () => {
        const result = value1 - value2;
        const value = `${value1} - ${value2} = ${result}`
        setHistory([...history, { key: value }]);
        setResult(result);
        setValue1("");
        setValue2("");
    }

    return (
        <View style={styles.container}>
            {result === null ? (
                <Text>No results yet</Text>
            ) : (
                <Text>Result: {result}</Text>
            )}

            <TextInput
                style={{
                    borderWidth: 1,
                    padding: 3,
                    height: 40,
                    width: '50%',
                    borderRadius: 5,
                }}
                inputMode='numeric'
                onChangeText={value => setValue1(Number(value))}
                value={value1}
            />
            <View style={{ margin: 5 }} />
            <TextInput
                style={{
                    borderWidth: 1,
                    padding: 3,
                    height: 40,
                    width: '50%',
                    borderRadius: 5,
                }}
                inputMode='numeric'
                onChangeText={value => setValue2(Number(value))}
                value={value2}
            />
            <View
                style={{
                    margin: 10,
                    padding: 10,
                    width: "40%",
                    flexDirection: "row",
                    justifyContent: 'space-around'
                }} >
                <Button onPress={additionPressed} title="+" />
                <Button onPress={substractionPressed} title="-" />
                <Button title="History" onPress={() => navigation.navigate("History", { history: history })} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Calculator