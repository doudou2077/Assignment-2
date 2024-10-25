import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { listentoCollection } from '../firebase/firebaseHelper';
import { useIsFocused } from '@react-navigation/native';

export default function ActivitiesScreen({ navigation }) {
    const [activities, setActivities] = useState([]);
    const { theme } = useTheme();
    const isFocused = useIsFocused();

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

    useEffect(() => {
        const unsubscribe = listentoCollection('activities', (updatedActivities) => {
            setActivities(updatedActivities)
        })
        // Cleanup function to unsubscribe when component unmounts
        return () => unsubscribe()
    }, [])

    const navigateToAddActivity = () => navigation.navigate('AddActivity');

    const handleItemPress = (item) => {
        navigation.navigate('AddActivity', { activity: item });
    };

    <ItemsList items={activities} type="activity" theme={theme} onItemPress={handleItemPress} />
    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={colors.primary} barStyle={theme.isDarkMode ? "light-content" : "dark-content"} />

            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Activities</Text>
                </View>
                <TouchableOpacity
                    style={sharedStyles.iconContainer}
                    onPress={navigateToAddActivity}
                >
                    <View style={sharedStyles.iconButton}>
                        <FontAwesome6 name="plus" size={24} color={colors.white} />
                    </View>
                    <View style={sharedStyles.iconButton}>
                        <MaterialCommunityIcons name="run" size={24} color={colors.white} />
                    </View>
                </TouchableOpacity>
            </View>
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