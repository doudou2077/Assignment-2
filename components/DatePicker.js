import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ date, setDate, label, showDatePicker, setShowDatePicker }) => {

    const onDateChange = (_, selectedDate) => {
        // If user doesn't select a date, pick the current date
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleDatePickerPress = () => {
        if (showDatePicker) {
            setShowDatePicker(false); // Close the date picker if it's already open
        } else {
            if (!date) {
                setDate(new Date()); // Set current date if none is selected yet
            }
            setShowDatePicker(true); // Open the date picker
        }
    };


    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={styles.datePickerButton}
                onPress={handleDatePickerPress}
            >
                <TextInput
                    style={styles.dateInput}
                    value={date ? date.toDateString() : ''}
                    placeholder=""
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
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    datePickerButton: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: 'lightgray'
    },
    dateInput: {
        fontSize: 16,
    },
});

export default DatePicker;