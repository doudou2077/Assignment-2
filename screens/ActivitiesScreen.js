import { View, Text, Button, FlatList, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useActivityContext } from '../context/ActivityContext';

export default function ActivitiesScreen({ navigation }) {
    const { activities } = useActivityContext();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('AddActivity')}
                    title="Add"
                />
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }) => (
        <View style={styles.activityItem}>
            <Text>Type: {item.type}</Text>
            <Text>Duration: {item.duration} mins</Text>
            <Text>Date: {item.date.toDateString()}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={activities}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    activityItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
});