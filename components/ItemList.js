import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { listScreenStyles } from '../helperFile/listScreenStyles';

const ItemsList = ({ items, type }) => {
    const renderItem = ({ item }) => (
        <View style={listScreenStyles.listItem}>
            {type === 'activity' ? (
                <>
                    <Text style={listScreenStyles.listItemTitle}>{item.type}</Text>
                    <Text style={listScreenStyles.listItemSubtitle}>Duration: {item.duration} mins</Text>
                    <Text style={listScreenStyles.listItemSubtitle}>Date: {item.date.toDateString()}</Text>
                </>
            ) : (
                <>
                    <Text style={listScreenStyles.listItemTitle}>{item.description}</Text>
                    <Text style={listScreenStyles.listItemSubtitle}>Calories: {item.calories}</Text>
                    <Text style={listScreenStyles.listItemSubtitle}>Date: {item.date.toDateString()}</Text>
                </>
            )}
        </View>
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={listScreenStyles.listContainer}
        />
    );
};

export default ItemsList;