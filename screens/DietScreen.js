import React, { useLayoutEffect } from 'react';
import { View, Button, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { useCombinedContext } from '../context/CombinedContext';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { listScreenStyles } from '../helperFile/listScreenStyles';

export default function DietScreen({ navigation }) {
    const { dietEntries } = useCombinedContext();
    const { theme } = useTheme();

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Diet</Text>
                </View>
                <TouchableOpacity
                    style={sharedStyles.addButton}
                    onPress={() => navigation.navigate('AddDiet')}
                >
                    <Text style={sharedStyles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={[listScreenStyles.listContainer]}>
                <ItemsList items={dietEntries} type="diet" />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});