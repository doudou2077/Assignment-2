import React from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { useCombinedContext } from '../context/CombinedContext';
import ItemsList from '../components/ItemList';
import { useTheme } from '../context/ThemeContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { listScreenStyles } from '../helperFile/listScreenStyles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function DietScreen({ navigation }) {
    // Accessing diet entries from the combined context
    const { dietEntries } = useCombinedContext();
    // Accessing the current theme from the theme context
    const { theme } = useTheme();

    const navigateToAddDiet = () => navigation.navigate('AddDiet');

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Diet</Text>
                </View>
                <TouchableOpacity
                    style={sharedStyles.iconContainer}
                    onPress={navigateToAddDiet}
                >
                    <View style={sharedStyles.iconButton}>
                        <FontAwesome6 name="plus" size={24} color={colors.white} />
                    </View>
                    <View style={sharedStyles.iconButton}>
                        <MaterialIcons name="fastfood" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[listScreenStyles.listContainer]}>
                <ItemsList items={dietEntries} type="diet" />
            </View>
        </View >
    );
}
