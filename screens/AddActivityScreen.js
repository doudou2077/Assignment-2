import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddActivityScreen() {
    // state for dropdown
    const [activityType, setActivityType] = useState(new Date());
    const [open, setOpen] = useState(false);

    // state for duration
    const [duration, setDuration] = useState('');

    // state for date picker
    const [date, setDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onDateChange = (selectedDate) => {
        console.log('onDateChange called', selectedDate);
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios'); // Close the calendar once a date is selected or dismissed
        setDate(currentDate);  // Update the state with the selected date
    };

    return (
        <View >
            <Text>Activity *</Text>
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

            <Text>Duration(mins) *</Text>
            <TextInput
                placeholder=''
                keyboardType='numeric'
                value={duration}
                onChangeText={setDuration}
            />

            <Text>Date *</Text>
            <TouchableOpacity
                onPress={() => {
                    console.log('TouchableOpacity pressed');
                    const newShowDatePicker = !showDatePicker;
                    setShowDatePicker(newShowDatePicker);
                    console.log('showDatePicker changed:', newShowDatePicker);
                }}
            >
                <TextInput
                    value={date ? date.toDateString() : ''}
                    placeholder={""}
                    editable={false}
                />
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={date || new Date()}
                    mode="date"
                    display="inline"
                    onChange={onDateChange}
                />
            )}

        </View>
    )
}