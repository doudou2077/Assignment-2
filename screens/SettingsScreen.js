import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';

export default function SettingsScreen() {
    const { isDarkMode, toggleTheme, theme } = useTheme();

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Settings</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Text style={[styles.text, { color: theme.textColor }]}>Toggle Theme</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleTheme}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});