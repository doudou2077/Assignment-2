import React, { useLayoutEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useActivityContext } from '../context/ActivityContext';
import ItemsList from '../components/ItemList';

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

    return (
        <View style={styles.container}>
            <ItemsList items={activities} type="activity" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});