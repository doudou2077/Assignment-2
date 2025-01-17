import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// list component used in addactivity and add diet screens to avoid code duplication
const ItemsList = ({ items, type }) => {
    // Function to determine if an activity is special based on type and duration
    const isSpecialActivity = (item) => {
        const lowercaseType = item.type.toLowerCase();
        const duration = Number(item.duration);
        return (lowercaseType === 'running' || lowercaseType === 'weights') && duration > 60;
    };

    // Function to determine if a diet item is special based on calories
    const isSpecialDiet = (item) => {
        return item.calories > 800;
    };

    const renderItem = ({ item }) => {
        const special = type === 'activity' ? isSpecialActivity(item) : isSpecialDiet(item);
        return (
            <View style={listScreenStyles.listItem}>
                // Display activities or description
                <View style={listScreenStyles.typeContainer}>
                    <Text style={listScreenStyles.itemType}>
                        {type === 'activity' ? item.type : item.description}
                    </Text>
                    // Icon for special items
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
                    // Display date
                    <View style={listScreenStyles.detailBox}>
                        <Text style={listScreenStyles.detailText}>{item.date.toDateString()}</Text>
                    </View>
                    // Display duration or calories
                    <View style={listScreenStyles.detailBox}>
                        <Text style={listScreenStyles.detailText}>
                            {type === 'activity' ? `${item.duration} min` : `${item.calories} cal`}
                        </Text>
                    </View>
                </View>
            </View>
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