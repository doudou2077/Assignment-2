import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useCombinedContext } from '../context/CombinedContext';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { listScreenStyles } from '../helperFile/listScreenStyles';

export default function ActivitiesScreen({ navigation }) {
    const { activities } = useCombinedContext(); // Accessing activity entries from the combined context
    const { theme } = useTheme();// Accessing the current theme from the theme context

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={colors.primary} barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />

            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Activities</Text>
                </View>
                <TouchableOpacity
                    style={sharedStyles.addButton}
                    onPress={() => navigation.navigate('AddActivity')} // Navigate to the AddActivity screen on press
                >
                    <Text style={sharedStyles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <View style={[listScreenStyles.listContainer, { backgroundColor: theme.backgroundColor }]}>
                {/* Rendering the ItemsList component with activity entries */}
                <ItemsList items={activities} type="activity" theme={theme} />
            </View>
        </View>
    );
}