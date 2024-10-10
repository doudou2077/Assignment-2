import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DietScreen({ navigation }) {
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
        <View style={styles.container}>
            <Text>DietScreen</Text>
            {/* add the list of diet entries here later */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});