import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles } from '../helperFile/sharedStyles';

// SettingsScreen component for managing application settings
export default function SettingsScreen() {
    const { isDarkMode, toggleTheme, theme } = useTheme(); // Accessing theme context values

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Settings</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Toggle Theme</Text>
                <Switch
                    value={isDarkMode} // Current value of the switch based on dark mode state
                    onValueChange={toggleTheme} // Function to toggle the theme on switch change
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', textShadowColor: '#585858',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: '#FFFFD0',
        fontWeight: 'bold',
    },
});