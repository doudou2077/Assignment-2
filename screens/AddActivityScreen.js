import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '../context/ThemeContext';
import { writeToDB } from '../firebase/firebaseHelper';
import Checkbox from 'expo-checkbox';

export default function AddActivityScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { theme } = useTheme();

    // Check if we're editing an existing activity
    const isEditMode = route.params?.activity !== undefined;
    const activity = route.params?.activity || {};

    // Initialize state
    const [activityType, setActivityType] = useState(activity.type || null);
    const [open, setOpen] = useState(false);
    const [duration, setDuration] = useState(activity.duration?.toString() || '');
    const [date, setDate] = useState(activity.date ? new Date(activity.date) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [isSpecial, setIsSpecial] = useState(activity.isSpecial || false);

    const isSpecialActivity = (type, duration) => {
        const lowercaseType = type.toLowerCase();
        return (lowercaseType === 'running' || lowercaseType === 'weights') && duration > 60;
    };


    const handleCancel = () => {
        navigation.goBack();
    };

    const handleSave = () => {
        const durationNumber = Number(duration);
        if (!activityType || !duration || isNaN(durationNumber) || durationNumber <= 0 || !date) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        }

        const newActivity = {
            type: activityType,
            duration: durationNumber,
            date: date.toISOString(),
            isSpecial: isEditMode ? isSpecial : isSpecialActivity(activityType, durationNumber)
        };

        if (isEditMode) {
            Alert.alert(
                "Important",
                "Are you sure you want to save these changes?",
                [
                    {
                        text: "No",
                        style: "cancel"
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            try {
                                await writeToDB(newActivity, `activities`, activity.id);
                                console.log('Activity updated:', newActivity);
                                navigation.goBack();
                            } catch (error) {
                                console.log('Error updating activity:', error);
                                Alert.alert('Error', 'Failed to update activity.');
                            }
                        }
                    }
                ]
            );
        } else {
            // For adding a new activity, save directly without showing an alert
            writeToDB(newActivity, 'activities')
                .then(() => {
                    console.log('Activity saved:', newActivity);
                    navigation.goBack();
                })
                .catch(error => {
                    console.log('Error saving activity:', error);
                    Alert.alert('Error', 'Failed to save activity.');
                });
        }
    };


    return (
        <View style={[sharedStyles.container, { backgroundColor: theme.backgroundColor }]}>
            <View style={sharedStyles.headerContainer}>
                <View style={styles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>{isEditMode ? 'Edit Activity' : 'Add Activity'}</Text>
                </View>
                <TouchableOpacity
                    style={sharedStyles.goBackButton}
                    onPress={handleCancel}
                >
                    <AntDesign name="left" size={24} style={[sharedStyles.goBackButtonText, { color: 'white' }]} />
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback
                onPress={() => {
                    if (open) setOpen(false); // Close dropdown picker
                    if (showDatePicker) setShowDatePicker(false); // Close date picker
                }}
            >
                <View style={sharedStyles.centeredContainer}>
                    <View style={[sharedStyles.formElement, { zIndex: open ? 3000 : 1 }]}>
                        <Text style={[sharedStyles.label, { color: theme.textColor }]}>Activity *</Text>
                        <DropDownPicker
                            open={open} // Control dropdown visibility
                            value={activityType} // Current selected value
                            items={[
                                { label: 'Walking', value: 'walking' },
                                { label: 'Running', value: 'running' },
                                { label: 'Swimming', value: 'swimming' },
                                { label: 'Weights', value: 'weights' },
                                { label: 'Yoga', value: 'yoga' },
                                { label: 'Cycling', value: 'cycling' },
                                { label: 'Hiking', value: 'hiking' },
                            ]}
                            setOpen={setOpen}
                            setValue={setActivityType}
                            placeholder='Select An Activity'
                            style={styles.dropdown}
                            zIndex={3000}
                            zIndexInverse={1000}
                            textStyle={{ color: theme.textColor }}
                            dropDownContainerStyle={{
                                maxHeight: 210,
                            }}
                        />
                    </View>

                    <View style={[sharedStyles.formElement, { zIndex: open ? 1 : 1000 }]}>
                        <Text style={[sharedStyles.label, { color: theme.textColor }]}>Duration(mins) *</Text>
                        <TextInput
                            style={[styles.durationInput, { color: theme.textColor }]}
                            placeholder=''
                            keyboardType='numeric'
                            value={duration}
                            onChangeText={setDuration}
                            backgroundColor='lightgray'
                        />
                    </View>

                    <View style={[sharedStyles.formElement, { zIndex: open ? 1 : 1000 }]}>
                        <DatePicker
                            date={date}
                            setDate={setDate}
                            setShowDatePicker={setShowDatePicker}
                            showDatePicker={showDatePicker}
                            label="Date *"
                            theme={theme}
                        />
                    </View>

                    {isEditMode && isSpecialActivity(activityType, Number(duration)) && (
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                value={isSpecial}
                                onValueChange={setIsSpecial}
                                color={isSpecial ? colors.primary : undefined}
                            />
                            <Text style={[styles.checkboxLabel, { color: theme.textColor }]}>
                                This item is marked as special. Select the checkbox if you would like to approve it.
                            </Text>
                        </View>

                    )}
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
    );
}

const styles = StyleSheet.create({
    headerTextContainer: {
        paddingLeft: 70,
    },
    dropdown: {
        marginBottom: 16,
        zIndex: 3000,
        backgroundColor: 'lightgray'
    },
    durationInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        marginLeft: 8,
        flex: 1,
    },
});