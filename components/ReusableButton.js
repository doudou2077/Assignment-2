import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../helperFile/sharedStyles';

// ReusableButton component that creates a customizable button
const ReusableButton = ({ onPress, title, style, textStyle, color = 'primary' }) => {
    return (
        // Pressable component for the button, providing visual feedback when pressed
        <Pressable
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: colors[color] },
                { opacity: pressed ? 0.7 : 1 },
                style
            ]}
            onPress={onPress}
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ReusableButton;