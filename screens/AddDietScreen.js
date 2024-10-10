import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';
import { useDietContext } from '../context/DietContext';

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
        <View style={styles.container}>
            <Text style={styles.label}>Description *</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
            />

            <Text style={styles.label}>Calories *</Text>
            <TextInput
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                placeholder="Enter calories"
                keyboardType="numeric"
            />

            <DatePicker date={date} setDate={setDate} label="Date *" />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#D32F2F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});