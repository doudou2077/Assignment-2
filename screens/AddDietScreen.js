import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';
import { useDietContext } from '../context/DietContext';
import { sharedStyles, colors } from '../helperFile/sharedStyles';

export default function AddDietScreen() {
    const navigation = useNavigation();
    const { addDietEntry } = useDietContext();

    const [description, setDescription] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState(null);

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
        <View style={sharedStyles.container}>
            <Text style={sharedStyles.label}>Description *</Text>
            <TextInput
                style={sharedStyles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
            />

            <Text style={sharedStyles.label}>Calories *</Text>
            <TextInput
                style={sharedStyles.input}
                value={calories}
                onChangeText={setCalories}
                placeholder="Enter calories"
                keyboardType="numeric"
            />

            <DatePicker date={date} setDate={setDate} label="Date *" />

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
    );
}

