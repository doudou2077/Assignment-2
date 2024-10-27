import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StatusBar } from 'react-native';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { listentoCollection } from '../firebase/firebaseHelper';
import { useIsFocused } from '@react-navigation/native';

export default function ActivitiesScreen({ navigation }) {
    // state to store the list of activities
    const [activities, setActivities] = useState([]);
    // Get the current theme
    const { theme } = useTheme();
    // Check if this screen is currently focused
    const isFocused = useIsFocused();

    // Effect to update tab bar style when screen is focused
    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({
                tabBarStyle: {
                    display: 'flex',
                    backgroundColor: '#4A55A2'
                }
            });
        }
    }, [isFocused, navigation]);

    // Effect to listen for changes in the activities collection
    useEffect(() => {
        const unsubscribe = listentoCollection('activities', (updatedActivities) => {
            setActivities(updatedActivities)
        })
        // Cleanup function to unsubscribe when component unmounts
        return () => unsubscribe()
    }, [])

    // Function to navigate to the AddActivity screen
    const navigateToAddActivity = () => navigation.navigate('AddActivity');

    // Function to handle press on an activity item
    const handleItemPress = (item) => {
        navigation.navigate('AddActivity', { activity: item });
    };

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={colors.primary} barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />

            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Activities</Text>
                </View>
                {/* Button to add a new activity */}
                <Pressable
                    style={({ pressed }) => [
                        sharedStyles.iconContainer,
                        { opacity: pressed ? 0.7 : 1 }
                    ]}
                    onPress={navigateToAddActivity}
                >
                    <View style={sharedStyles.iconButton}>
                        <FontAwesome6 name="plus" size={24} color={colors.white} />
                    </View>
                    <View style={sharedStyles.iconButton}>
                        <MaterialCommunityIcons name="run" size={24} color={colors.white} />
                    </View>
                </Pressable>
            </View>
            {/* Container for the list of activities */}
            <View style={[listScreenStyles.listContainer, { backgroundColor: theme.backgroundColor }]}>
                <ItemsList
                    items={activities}
                    type="activity"
                    theme={theme}
                    onItemPress={handleItemPress}
                />
            </View>
        </View>
    );
}