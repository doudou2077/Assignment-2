import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useCombinedContext } from '../context/CombinedContext';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function ActivitiesScreen({ navigation }) {
    const { activities } = useCombinedContext();
    const { theme } = useTheme();

    const navigateToAddActivity = () => navigation.navigate('AddActivity');

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
                <ItemsList items={activities} type="activity" theme={theme} />
            </View>
        </View>
    );
}