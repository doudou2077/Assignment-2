import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ItemsList = ({ items, type, onItemPress }) => {

    const isSpecialActivity = (item) => {
        const lowercaseType = item.type.toLowerCase();
        const duration = Number(item.duration);
        return (lowercaseType === 'running' || lowercaseType === 'weights') && duration > 60 && item.isSpecial;
    };

    const isSpecialDiet = (item) => {
        return item.calories > 800;
    };

    const renderItem = ({ item }) => {
        const special = type === 'activity' ? isSpecialActivity(item) : isSpecialDiet(item);
        const dateObject = item.date instanceof Date ? item.date : new Date(item.date);

        return (
            <TouchableOpacity onPress={() => onItemPress(item)}>
                <View style={listScreenStyles.listItem}>
                    <View style={listScreenStyles.typeContainer}>
                        <Text style={listScreenStyles.itemType}>
                            {type === 'activity' ? item.type : item.description}
                        </Text>
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
                </View>
            </TouchableOpacity>
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