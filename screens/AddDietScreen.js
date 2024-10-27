import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import DatePicker from '../components/DatePicker';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { useTheme } from '../context/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { writeToDB, deleteFromDB } from '../firebase/firebaseHelper';
import Checkbox from 'expo-checkbox';
import ReusableButton from '../components/ReusableButton';

export default function AddDietScreen({ navigation, route }) {

    const { theme } = useTheme();
    const { params } = route;

    // Check if we're editing an existing diet entry
    const isEditMode = params?.dietEntry != undefined;
    const dietEntry = params?.dietEntry || {};

    // State variables for form inputs
    const [description, setDescription] = useState(dietEntry.description || '');
    const [calories, setCalories] = useState(dietEntry.calories ? dietEntry.calories.toString() : '');
    const [date, setDate] = useState(dietEntry.date ? new Date(dietEntry.date) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isSpecial, setIsSpecial] = useState(dietEntry.isSpecial || false);


    const isSpecialDiet = (calories) => {
        return calories > 800;
    };


    // Function to handle cancel action
    const handleCancel = () => {
        navigation.goBack();
    };


    const handleDelete = () => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this diet entry?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await deleteFromDB(dietEntry.id, 'diet');
                            console.log('Diet entry deleted:', dietEntry.id);
                            navigation.goBack();
                        } catch (error) {
                            console.log('Error deleting diet entry:', error);
                            Alert.alert('Error', 'Failed to delete diet entry.');
                        }
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    // Function to handle saving the diet entry
    const handleSave = async () => {
        const caloriesNumber = Number(calories);
        if (!description || !calories || !date || isNaN(caloriesNumber) || caloriesNumber <= 0) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        }

        // Create a new diet entry object
        const newDietEntry = {
            description,
            calories: caloriesNumber,
            date: date.toISOString(),
            isSpecial: isEditMode ? isSpecial : isSpecialDiet(caloriesNumber)
        };

        if (isEditMode) {
            Alert.alert(
                "Important",
                "Are you sure you want to save these changes?",
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
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

            )

        } else {
            try {
                await writeToDB(newDietEntry, 'diet');
                console.log('Diet entry saved:', newDietEntry);
                navigation.goBack();
            } catch (error) {
                console.log('Error saving diet entry:', error);
                Alert.alert('Error', 'Failed to save diet entry.')
            }

        };

    };

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={sharedStyles.headerContainer}>
                <Pressable
                    style={({ pressed }) => [
                        sharedStyles.goBackButton,
                        { opacity: pressed ? 0.7 : 1 }
                    ]}
                    onPress={handleCancel}
                >
                    <AntDesign name="left" size={24} style={[sharedStyles.goBackButtonText, { color: 'white' }]} />
                </Pressable>

                <View style={sharedStyles.headerTextContainer}>
                    <Text style={styles.headerText}>{isEditMode ? 'Edit' : 'Add Diet Entry'}</Text>
                </View>

                {/* the delete button for edit page */}
                {isEditMode && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.deleteButton,
                            { opacity: pressed ? 0.7 : 1 }
                        ]}
                        onPress={handleDelete}
                    >
                        <AntDesign name="delete" size={24} color="white" style={{ paddingTop: 10 }} />
                    </Pressable>
                )}


            </View>

            <Pressable
                style={sharedStyles.centeredContainer}
                onPress={() => {
                    if (showDatePicker) {
                        setShowDatePicker(false);
                    }
                }}
            >
                <View style={sharedStyles.centeredContainer}>
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

                    <View style={sharedStyles.formElement}>
                        <Pressable onPress={(e) => e.stopPropagation()}>
                            <DatePicker
                                theme={theme}
                                date={date}
                                setDate={setDate}
                                setShowDatePicker={setShowDatePicker}
                                showDatePicker={showDatePicker}
                                label="Date *"
                            />
                        </Pressable>
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

                    <View style={sharedStyles.buttonContainer}>
                        <ReusableButton
                            title="Cancel"
                            onPress={handleCancel}
                            color="secondary"
                        />
                        <ReusableButton
                            title="Save"
                            onPress={handleSave}
                            color="primary"
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 10
    },

    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    descriptionInput: {
        height: 75,
        textAlignVertical: 'top',  // Align text to the top
    },
});