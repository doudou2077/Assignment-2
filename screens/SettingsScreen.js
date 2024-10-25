import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const { isDarkMode, toggleTheme, theme } = useTheme();

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={sharedStyles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Settings</Text>
                </View>
            </View>
            <View style={styles.content}>
                <Pressable
                    style={({ pressed }) => [
                        styles.themeToggle,
                        { backgroundColor: pressed ? colors.primary : colors.secondary }
                    ]}
                    onPress={toggleTheme}
                >
                    <MaterialCommunityIcons
                        name={isDarkMode ? 'weather-night' : 'weather-sunny'}
                        size={24}
                        color={colors.white}
                    />
                    <Text style={styles.toggleText}>
                        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerTextContainer: {
        paddingLeft: 70,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
    },
    toggleText: {
        marginLeft: 10,
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
    },
});