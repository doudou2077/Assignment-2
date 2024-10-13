import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';
import { useDietContext } from '../context/DietContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { useTheme } from '../context/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function AddDietScreen() {
    const navigation = useNavigation();
    const { addDietEntry } = useDietContext();
    const { theme } = useTheme();

    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const handleCancel = () => {
        navigation.goBack();
    };

    const handleSave = () => {
        const caloriesNumber = Number(calories);
        if (!description || !calories || !date || isNaN(caloriesNumber) || caloriesNumber <= 0) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        }

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
                    <Text style={[sharedStyles.headerText, { color: theme.textColor }]}>Add Diet Entry</Text>
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
                        <TouchableOpacity
                            style={[sharedStyles.button, { backgroundColor: colors.secondary }]}
                            onPress={handleCancel}
                        >
                            <Text style={sharedStyles.buttonText}>Cancel</Text>
                        </TouchableOpacity>

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