import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Pressable } from 'react-native';
import DatePicker from '../components/DatePicker';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { useTheme } from '../context/ThemeContext';
import { writeToDB } from '../firebase/firebaseHelper';
import Checkbox from 'expo-checkbox';
import AddEditItemScreen from '../components/AddEditItemScreen';

export default function AddDietScreen({ navigation, route }) {
    const { theme } = useTheme();
    const { params } = route;

    // Check if we're in edit mode by looking for a diet entry in the route params
    const isEditMode = params?.dietEntry != undefined;
    const dietEntry = params?.dietEntry || {};

    // State management for form fields
    const [description, setDescription] = useState(dietEntry.description || '');
    const [calories, setCalories] = useState(dietEntry.calories ? dietEntry.calories.toString() : '');
    const [date, setDate] = useState(dietEntry.date ? new Date(dietEntry.date) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isSpecial, setIsSpecial] = useState(dietEntry.isSpecial || false);

    // Determine if a diet entry should be marked as special based on calories
    const isSpecialDiet = (calories) => {
        return calories > 800;
    };

    // Handle saving or updating a diet entry
    const handleSave = async () => {
        const caloriesNumber = Number(calories);
        if (!description || !calories || !date || isNaN(caloriesNumber) || caloriesNumber <= 0) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        }

        const newDietEntry = {
            description,
            calories: caloriesNumber,
            date: date.toISOString(),
            isSpecial: isEditMode ? isSpecial : isSpecialDiet(caloriesNumber)
        };

        // Handle edit mode with confirmation
        if (isEditMode) {
            Alert.alert(
                "Important",
                "Are you sure you want to save these changes?",
                [
                    { text: "No", style: "cancel" },
                    {
                        text: "Yes",
                        onPress: async () => {
                            try {
                                await writeToDB(newDietEntry, 'diet', dietEntry.id)
                                console.log('New diet updated:', newDietEntry);
                                navigation.goBack();
                            } catch (error) {
                                console.log('Error updating diet entry:', error);
                                Alert.alert('Error', 'Failed to update diet entry.');
                            }
                        }
                    }
                ]
            );
        } else {
            try {
                await writeToDB(newDietEntry, 'diet');
                console.log('Diet entry saved:', newDietEntry);
                navigation.goBack();
            } catch (error) {
                console.log('Error saving diet entry:', error);
                Alert.alert('Error', 'Failed to save diet entry.')
            }
        }
    };

    const handleOutsidePress = () => {
        if (showDatePicker) {
            setShowDatePicker(false);
        }
    };

    return (
        <AddEditItemScreen
            navigation={navigation}
            isEditMode={isEditMode}
            itemType="diet"
            item={dietEntry}
            handleSave={handleSave}
            isSpecial={isSpecial}
            setIsSpecial={setIsSpecial}
            isSpecialItem={isSpecialDiet(Number(calories))}
        >
            <Pressable onPress={handleOutsidePress}>
                {/* Description Input */}
                <View style={sharedStyles.formElement}>
                    <Text style={[sharedStyles.label, { color: theme.textColor }]}>Description *</Text>
                    <TextInput
                        style={[styles.input, styles.descriptionInput, { color: theme.textColor }]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder=""
                        backgroundColor='lightgray'
                        multiline={true}
                        textAlignVertical="top"
                        numberOfLines={4}
                    />
                </View>

                {/* Calories Input */}
                <View style={sharedStyles.formElement}>
                    <Text style={[sharedStyles.label, { color: theme.textColor }]}>Calories *</Text>
                    <TextInput
                        style={[styles.input, { color: theme.textColor }]}
                        value={calories}
                        onChangeText={setCalories}
                        placeholder=""
                        keyboardType="numeric"
                        backgroundColor='lightgray'
                    />
                </View>

                {/* Date Picker */}
                <View style={sharedStyles.formElement}>
                    <DatePicker
                        theme={theme}
                        date={date}
                        setDate={setDate}
                        setShowDatePicker={setShowDatePicker}
                        showDatePicker={showDatePicker}
                        label="Date *"
                    />
                </View>
                {isEditMode && isSpecialDiet(Number(calories)) && (
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            value={isSpecial}
                            onValueChange={setIsSpecial}
                            color={isSpecial ? colors.primary : undefined}
                        />
                        <Text style={[styles.checkboxLabel, { color: theme.textColor }]}>
                            This item is marked as special. Select the checkbox if you would like to approve it.
                        </Text>
                    </View>
                )}
            </Pressable>
        </AddEditItemScreen>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    descriptionInput: {
        height: 75,
        textAlignVertical: 'top',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 50
    },
    checkboxLabel: {
        marginLeft: 8,
        flex: 1,
    },
});