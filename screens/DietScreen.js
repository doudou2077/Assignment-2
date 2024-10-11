import React, { useLayoutEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useDietContext } from '../context/DietContext';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';

export default function DietScreen({ navigation }) {
    const { dietEntries } = useDietContext();
    const { theme } = useTheme();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('AddDiet')}
                    title="Add"
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <ItemsList items={dietEntries} type="diet" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});