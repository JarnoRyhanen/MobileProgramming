import { Text, View, FlatList } from 'react-native';

const History = ({ route }) => {
    const { history } = route.params;
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
        }}>
            <Text>History</Text>
            <FlatList
                data={history}
                renderItem={({ item }) => <Text>{item.key}</Text>}
                ListEmptyComponent={<Text>There is no history yet</Text>}
            />
        </View>
    )
}

export default History