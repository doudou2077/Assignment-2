import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useActivityContext } from '../context/ActivityContext';
import DatePicker from '../components/DatePicker';

export default function AddActivityScreen() {
    const navigation = useNavigation();
    const { addActivity } = useActivityContext();

    const handleCancel = () => {
        navigation.goBack();  // Go back to the previous screen
    };

    // state for dropdown
    const [activityType, setActivityType] = useState(null);
    const [open, setOpen] = useState(false);

    // state for duration
    const [duration, setDuration] = useState('');

    // state for date picker
    const [date, setDate] = useState(null);

    const closeDropDown = () => {
        setOpen(false);
    };


    const handleSave = () => {
        const durationNumber = Number(duration);
        if (!activityType || !duration || isNaN(durationNumber) || durationNumber <= 0 || !date) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        }
        const newActivity = {
            id: Date.now(),
            type: activityType,
            duration: durationNumber,
            date: date,
        };

        addActivity(newActivity);
        console.log('Activity saved:', newActivity);
        navigation.goBack();
    }

    return (
        <TouchableWithoutFeedback onPress={closeDropDown}>
            <View style={styles.container}>
                <Text style={styles.label}>Activity *</Text>
                <DropDownPicker
                    open={open}
                    value={activityType}
                    items={
                        [{ label: 'Walking', value: 'walking' },
                        { label: 'Running', value: 'running' },
                        { label: 'Swimming', value: 'swimming' },
                        { label: 'Weights', value: 'weights' },
                        { label: 'Yoga', value: 'yoga' },
                        { label: 'Cycling', value: 'cycling' },
                        { label: 'Hiking', value: 'hiking' },]
                    }
                    setOpen={setOpen}
                    setValue={setActivityType}
                    placeholder='Select An Activity'
                    style={styles.dropdown}
                    zIndex={3000}
                    zIndexInverse={1000}
                />

                <Text style={styles.label}>Duration(mins) *</Text>
                <TextInput
                    style={styles.durationInput}
                    placeholder=''
                    keyboardType='numeric'
                    value={duration}
                    onChangeText={setDuration}
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


        </TouchableWithoutFeedback>
    )
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
    container: {
        flex: 1,
        padding: 20,
    },
    dropdown: {
        marginBottom: 15,
        zIndex: 3000,
    },
    durationInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    datePickerButton: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    dateInput: {
        fontSize: 16,
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