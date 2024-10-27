import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '../components/DatePicker';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { useTheme } from '../context/ThemeContext';
import { writeToDB } from '../firebase/firebaseHelper';
import Checkbox from 'expo-checkbox';
import AddEditItemScreen from '../components/AddEditItemScreen';

export default function AddActivityScreen({ navigation, route }) {
    const { theme } = useTheme();
    const { params } = route;

    // Check if we're in edit mode by looking for an activity in the route params
    const isEditMode = params?.activity !== undefined;
    const activity = params?.activity || {};

    // State management for form fields
    const [activityType, setActivityType] = useState(activity.type || null);
    const [open, setOpen] = useState(false);
    const [duration, setDuration] = useState(activity.duration?.toString() || '');
    const [date, setDate] = useState(activity.date ? new Date(activity.date) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isSpecial, setIsSpecial] = useState(activity.isSpecial || false);

    // Determine if an activity should be marked as special based on type and duration
    const isSpecialActivity = (type, duration) => {
        if (!type) return false;
        const lowercaseType = type.toLowerCase();
        return (lowercaseType === 'running' || lowercaseType === 'weights') && duration > 60;
    };

    // Handle saving or updating an activity
    const handleSave = () => {
        const durationNumber = Number(duration);
        if (!activityType || !duration || isNaN(durationNumber) || durationNumber <= 0 || !date) {
            Alert.alert('Invalid Input', 'Please check your input values');
            return;
        }
        // Prepare activity data
        const newActivity = {
            type: activityType,
            duration: durationNumber,
            date: date.toISOString(),
            isSpecial: isEditMode ? isSpecial : isSpecialActivity(activityType, durationNumber)
        };
        // Handle edit mode with confirmation
        if (isEditMode) {
            Alert.alert(
                "Important",
                "Are you sure you want to save these changes?",
                [
                    { text: "No", style: "cancel" },
                    {
                        text: "Yes",
                        onPress: async () => {
                            try {
                                await writeToDB(newActivity, 'activities', activity.id);
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
            // Handle creating new activity
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

    // Add handler to close pickers when clicking outside
    const handleOutsidePress = () => {
        if (open) {
            setOpen(false);
        }
        if (showDatePicker) {
            setShowDatePicker(false);
        }
    };

    return (
        <AddEditItemScreen
            navigation={navigation}
            isEditMode={isEditMode}
            itemType="activity"
            item={activity}
            handleSave={handleSave}
            isSpecial={isSpecial}
            setIsSpecial={setIsSpecial}
            isSpecialItem={isSpecialActivity(activityType, Number(duration))}
            showDatePicker={showDatePicker}
        >
            <Pressable onPress={handleOutsidePress}>
                {/* Activity Type Dropdown */}
                <View style={[sharedStyles.formElement, { zIndex: open ? 3000 : 1 }]}>
                    <Text style={[sharedStyles.label, { color: theme.textColor }]}>Activity *</Text>
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <DropDownPicker
                            open={open}
                            value={activityType}
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
                                backgroundColor: 'lightgrey',
                            }}
                        />
                    </Pressable>
                </View>

                {/* Duration Input */}
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

                {/* Date Picker */}
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

                {/* Special Activity Checkbox */}
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
            </Pressable>
        </AddEditItemScreen>
    );
}

const styles = StyleSheet.create({
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
        paddingTop: 50,
        marginBottom: -10
    },
    checkboxLabel: {
        marginLeft: 8,
        flex: 1,
    },
});