import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ItemsList = ({ items, type }) => {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            {type === 'activity' ? (
                <>
                    <Text style={styles.title}>{item.type}</Text>
                    <Text>Duration: {item.duration} mins</Text>
                    <Text>Date: {item.date.toDateString()}</Text>
                </>
            ) : (
                <>
                    <Text style={styles.title}>{item.description}</Text>
                    <Text>Calories: {item.calories}</Text>
                    <Text>Date: {item.date.toDateString()}</Text>
                </>
            )}
        </View>
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ItemsList;