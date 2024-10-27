import React, { useState, useEffect } from 'react';
import { View, StatusBar, Pressable, Text } from 'react-native';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { listentoCollection } from '../firebase/firebaseHelper';

export default function DietScreen({ navigation }) {
    const [diets, setDiets] = useState([]);
    // Accessing the current theme from the theme context
    const { theme } = useTheme();

    // function to fetch updated diet enrty data from firebase
    useEffect(() => {
        const unsubscribe = listentoCollection('diet', (updatedDiet) => {
            setDiets(updatedDiet)
        });
        return () => unsubscribe()
    }
        , [])

    const navigateToAddDiet = () => navigation.navigate('AddDiet');

    const handleItemPress = (item) => {
        navigation.navigate('AddDiet', { dietEntry: item })
    }

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Diet</Text>
                </View>
                <Pressable
                    style={({ pressed }) => [
                        sharedStyles.iconContainer,
                        { opacity: pressed ? 0.7 : 1 }
                    ]}
                    onPress={navigateToAddDiet}
                >
                    <View style={sharedStyles.iconButton}>
                        <FontAwesome6 name="plus" size={24} color={colors.white} />
                    </View>
                    <View style={sharedStyles.iconButton}>
                        <MaterialIcons name="fastfood" size={24} color="white" />
                    </View>
                </Pressable>
            </View>
            <View style={[listScreenStyles.listContainer]}>
                <ItemsList
                    items={diets}
                    type="diet"
                    onItemPress={handleItemPress} />
            </View>
        </View >
    );
}
