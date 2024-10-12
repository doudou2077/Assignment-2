import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../helperFile/sharedStyles';

const ItemsList = ({ items, type }) => {
    const isSpecialActivity = (item) => {
        const lowercaseType = item.type.toLowerCase();
        const duration = Number(item.duration);
        const isSpecial = (
            (lowercaseType === 'running' || lowercaseType === 'weights')
            && duration > 60
        );
        console.log(`Activity: ${item.type}, Duration: ${duration}, Is Special: ${isSpecial}`);
        return isSpecial;
    };

    const renderItem = ({ item }) => {
        const special = isSpecialActivity(item);
        return (
            <View style={listScreenStyles.listItem}>
                {type === 'activity' ? (
                    <>
                        <View style={listScreenStyles.typeContainer}>
                            <Text style={listScreenStyles.itemType}>{item.type}</Text>
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
                                <Text style={listScreenStyles.detailText}>{item.date.toDateString()}</Text>
                            </View>
                            <View style={listScreenStyles.detailBox}>
                                <Text style={listScreenStyles.detailText}>{item.duration} min</Text>
                            </View>
                        </View>
                        {console.log(`Rendering ${item.type}: Special icon ${special ? 'shown' : 'not shown'}`)}
                    </>
                ) : (
                    <>
                        <Text style={listScreenStyles.itemType}>{item.description}</Text>
                        <View style={listScreenStyles.detailsContainer}>
                            <View style={listScreenStyles.detailBox}>
                                <Text style={listScreenStyles.detailText}>{item.calories} cal</Text>
                            </View>
                            <View style={listScreenStyles.detailBox}>
                                <Text style={listScreenStyles.detailText}>{item.date.toDateString()}</Text>
                            </View>
                        </View>
                    </>
                )}
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