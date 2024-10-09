import { View, Text } from 'react-native'
import React from 'react'

export default function ActivitiesScreen({ navigation }) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('AddActivity')}  // Navigate to AddActivityScreen
                    title="Add"
                />
            ),
        });
    }, [navigation]);

    return (
        <View>
            <Text>ActivitiesScreen</Text>
        </View>
    )
}