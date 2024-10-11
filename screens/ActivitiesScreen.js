import React, { useLayoutEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useActivityContext } from '../context/ActivityContext';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';

export default function ActivitiesScreen({ navigation }) {
    const { activities } = useActivityContext();
    const { theme } = useTheme();

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
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
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