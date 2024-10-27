// components/Button.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../helperFile/sharedStyles';

const Button = ({ onPress, title, style, textStyle, color = 'primary' }) => {
    return (
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

export default Button;