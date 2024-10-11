import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
    const { isDarkMode, toggleTheme, theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.text, { color: theme.textColor }]}>Toggle Theme</Text>
            <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});