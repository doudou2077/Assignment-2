import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ date, setDate, label }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onDateChange = (_, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const handleDatePickerPress = () => {
        if (!date) {
            setDate(new Date());
        }
        setShowDatePicker(true);
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
                    placeholder="Select a date"
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
    },
    dateInput: {
        fontSize: 16,
    },
});

export default DatePicker;