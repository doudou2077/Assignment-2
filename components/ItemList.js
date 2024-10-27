import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// ItemsList component that renders a list of items (activities or diet entries)
const ItemsList = ({ items, type, onItemPress }) => {

    // function to determine if the activity is special
    const isSpecialActivity = (item) => {
        const lowercaseType = item.type.toLowerCase();
        const duration = Number(item.duration);
        return (lowercaseType === 'running' || lowercaseType === 'weights') && duration > 60 && item.isSpecial;
    };

    // function to determine if the diet entry is special
    const isSpecialDiet = (item) => {
        return item.calories > 800 && item.isSpecial;
    };

    const renderItem = ({ item }) => {
        const special = type === 'activity' ? isSpecialActivity(item) : isSpecialDiet(item);
        const dateObject = item.date instanceof Date ? item.date : new Date(item.date);

        return (
            <Pressable
                onPress={() => onItemPress(item)}
                style={({ pressed }) => [
                    listScreenStyles.listItem,
                    { opacity: pressed ? 0.7 : 1 }  // visual feedback when pressed
                ]}
            >
                <View style={listScreenStyles.typeContainer}>
                    <Text style={listScreenStyles.itemType}>
                        {type === 'activity' ? item.type : item.description}
                    </Text>
                    {/* Display warning icon if the item is special */}
                    {special && (
                        <FontAwesome
                            name="exclamation-triangle"
                            size={20}
                            color="#FFFF00"
                            style={listScreenStyles.icon}
                        />
                    )}
                </View>
                <View style={listScreenStyles.detailsContainer}>
                    <View style={listScreenStyles.detailBox}>
                        <Text style={listScreenStyles.detailText}>{dateObject.toDateString()}</Text>
                    </View>
                    <View style={listScreenStyles.detailBox}>
                        <Text style={listScreenStyles.detailText}>
                            {type === 'activity' ? `${item.duration} min` : `${item.calories} cal`}
                        </Text>
                    </View>
                </View>
            </Pressable>
        );
    };

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