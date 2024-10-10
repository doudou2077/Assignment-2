import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddActivityScreen() {
    // state for dropdown
    const [activityType, setActivityType] = useState(null);
    const [open, setOpen] = useState(false);

    // state for duration
    const [duration, setDuration] = useState('');

    // state for date picker
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);


    const onDateChange = (_, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDatePicker(false); // Close the calendar once a date is selected or dismissed
        setDate(currentDate);  // Update the state with the selected date
    };

    const handleDatePickerPress = () => {
        if (!date) {
            setDate(new Date());
        }
        setShowDatePicker(true);
    };


    return (
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
            />

            <Text style={styles.label}>Duration(mins) *</Text>
            <TextInput
                style={styles.durationInput}
                placeholder=''
                keyboardType='numeric'
                value={duration}
                onChangeText={setDuration}
            />

            <Text style={styles.label}>Date *</Text>
            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={handleDatePickerPress}
            >
                <TextInput
                    style={styles.dateInput}
                    value={date ? date.toDateString() : ''}
                    placeholder={""}
                    editable={false}
                />
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()}
                    mode="date"
                    display={'inline'}
                    onChange={onDateChange}
                />
            )}

        </View>
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
});