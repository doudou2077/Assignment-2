import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../helperFile/sharedStyles';

const ItemsList = ({ items, type }) => {
    const isSpecialActivity = (item) => {
        return (item.type === 'running' || item.type === 'weights') && item.duration > 60;
    };
    const renderItem = ({ item }) => (
        <View style={[listScreenStyles.listItem, styles.listItemRow]}>
            {type === 'activity' ? (
                <>
                    <Text style={listScreenStyles.itemType}>{item.type}</Text>
                    <View style={listScreenStyles.detailsContainer}>
                        <View style={listScreenStyles.detailBox}>
                            <Text style={listScreenStyles.detailText}>{item.date.toDateString()}</Text>
                        </View>
                        <View style={listScreenStyles.detailBox}>
                            <Text style={listScreenStyles.detailText}>{item.duration} min</Text>
                        </View>
                    </View>
                    {isSpecialActivity(item) && (
                        <FontAwesome name="exclamation-triangle" size={24} color={colors.white} style={listScreenStyles.icon} />
                    )}
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

const styles = StyleSheet.create({
    listItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    activityInfo: {
        flex: 1,
    },
});

export default ItemsList;