import React from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// DatePicker component for selecting a date
const DatePicker = ({ date, setDate, label, showDatePicker, setShowDatePicker, theme }) => {

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
            <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
            <Pressable
                style={({ pressed }) => [
                    styles.datePickerButton,
                    { backgroundColor: pressed ? 'darkgray' : 'lightgray' }
                ]}
                onPress={handleDatePickerPress}
            >
                <TextInput
                    style={[styles.dateInput, { color: theme.textColor }]}
                    value={date ? date.toDateString() : ''}
                    placeholder=""
                    editable={false} // Make the input non-editable
                />
            </Pressable>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date || new Date()} // Use the selected date or current date
                    mode="date"
                    display={'inline'} // Display inline
                    onChange={onDateChange}
                    textColor={theme.textColor}
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
    },
    dateInput: {
        fontSize: 16,
    },
});

export default DatePicker;