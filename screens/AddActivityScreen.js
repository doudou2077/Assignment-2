import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { useActivityContext } from '../context/ActivityContext';
import DatePicker from '../components/DatePicker';
import { sharedStyles, colors } from '../helperFile/sharedStyles';

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
        <View style={[sharedStyles.container]}>
            <View style={sharedStyles.headerContainer}>
                <View style={sharedStyles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>Add Activity</Text>
                </View>
                <TouchableOpacity
                    style={sharedStyles.goBackButton}
                    onPress={() => handleCancel()}
                >
                    <Text style={sharedStyles.goBackButtonText}> &lt; </Text>
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={closeDropDown}>
                <View style={sharedStyles.centeredContainer}>
                    <View style={sharedStyles.formElement}>
                        <Text style={sharedStyles.label}>Activity *</Text>
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
                    </View>

                    <View style={sharedStyles.formElement}>
                        <Text style={sharedStyles.label}>Duration(mins) *</Text>
                        <TextInput
                            style={styles.durationInput}
                            placeholder=''
                            keyboardType='numeric'
                            value={duration}
                            onChangeText={setDuration}
                        />
                    </View>

                    <View style={sharedStyles.formElement}>
                        <DatePicker date={date} setDate={setDate} label="Date *" />
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
                            onPress={handleSave}>
                            <Text style={sharedStyles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}



const styles = StyleSheet.create({
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
});