import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';
import { useCombinedContext } from '../context/CombinedContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { useTheme } from '../context/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function AddDietScreen() {
    const navigation = useNavigation();
    // Accessing the function to add a diet entry from context
    const { addDietEntry } = useCombinedContext();
    const { theme } = useTheme();

    // State variables for form inputs
    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Function to handle cancel action
    const handleCancel = () => {
        navigation.goBack();
    };

    // Function to handle saving the diet entry
    const handleSave = () => {
        const caloriesNumber = Number(calories);
        if (!description || !calories || !date || isNaN(caloriesNumber) || caloriesNumber <= 0) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        }

        // Create a new diet entry object
        const newDietEntry = {
            id: Date.now(),
            description,
            calories: caloriesNumber,
            date,
        };

        addDietEntry(newDietEntry);
        console.log('Diet entry saved:', newDietEntry);
        navigation.goBack();
    };

    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Add Diet Entry</Text>
                </View>
                <TouchableOpacity
                    style={sharedStyles.goBackButton}
                    onPress={handleCancel}
                >
                    <AntDesign name="left" size={24} style={[sharedStyles.goBackButtonText, { color: theme.textColor }]} />
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback>
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
                        {/* DatePicker component for selecting the date */}
                        <DatePicker
                            theme={theme}
                            date={date}
                            setDate={setDate}
                            setShowDatePicker={setShowDatePicker}
                            showDatePicker={showDatePicker}
                            label="Date *"
                        />
                    </View>

                    <View style={sharedStyles.buttonContainer}>
                        {/* Cancel button */}
                        <TouchableOpacity
                            style={[sharedStyles.button, { backgroundColor: colors.secondary }]}
                            onPress={handleCancel}
                        >
                            <Text style={sharedStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

                        {/* Save button */}
                        <TouchableOpacity
                            style={[sharedStyles.button, { backgroundColor: colors.primary }]}
                            onPress={handleSave}
                        >
                            <Text style={sharedStyles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
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
        textAlignVertical: 'top',  // Align text to the top
    },
});