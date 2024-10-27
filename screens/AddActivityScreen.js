import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '../components/DatePicker';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '../context/ThemeContext';
import { writeToDB, deleteFromDB } from '../firebase/firebaseHelper';
import Checkbox from 'expo-checkbox';
import ReusableButton from '../components/ReusableButton';


export default function AddActivityScreen({ navigation, route }) {
    const { params } = route;
    const { theme } = useTheme();

    // Check if we're editing an existing activity
    const isEditMode = params?.activity !== undefined;
    const activity = params?.activity || {};

    // Initialize state
    const [activityType, setActivityType] = useState(activity.type || null);
    const [open, setOpen] = useState(false);
    const [duration, setDuration] = useState(activity.duration?.toString() || '');
    const [date, setDate] = useState(activity.date ? new Date(activity.date) : null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isSpecial, setIsSpecial] = useState(activity.isSpecial || false);

    // function to determine if an activity is special or not
    const isSpecialActivity = (type, duration) => {
        const lowercaseType = type.toLowerCase();
        return (lowercaseType === 'running' || lowercaseType === 'weights') && duration > 60;
    };

    const handleCancel = () => {
        navigation.goBack();
    };


    // alert when user want to delete a activity
    const handleDelete = () => {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete this activity?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await deleteFromDB(activity.id, 'activities');
                            console.log('Activity deleted:', activity.id);
                            navigation.goBack();
                        } catch (error) {
                            console.log('Error deleting activity:', error);
                            Alert.alert('Error', 'Failed to delete activity.');
                        }
                    },
                    style: 'destructive'
                }
            ]
        );
    };

    // save data to firebase when user click save
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
                <Pressable
                    style={({ pressed }) => [
                        sharedStyles.goBackButton,
                        { opacity: pressed ? 0.7 : 1 }
                    ]}
                    onPress={handleCancel}
                >
                    <AntDesign name="left" size={24} style={[sharedStyles.goBackButtonText, { color: 'white' }]} />
                </Pressable>

                <View style={styles.headerTextContainer}>
                    <Text style={sharedStyles.headerText}>{isEditMode ? 'Edit' : 'Add Activity'}</Text>
                </View>

                {/* add the delete button in the edit mode */}
                {isEditMode && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.deleteButton,
                            { opacity: pressed ? 0.7 : 1 }
                        ]}
                        onPress={handleDelete}
                    >
                        <AntDesign name="delete" size={24} color="white" />
                    </Pressable>
                )}

            </View>
            <Pressable
                onPress={() => {
                    if (open) setOpen(false);
                    if (showDatePicker) setShowDatePicker(false);
                }}
                style={sharedStyles.centeredContainer}
            >
                <View style={sharedStyles.centeredContainer}>
                    <View style={[sharedStyles.formElement, { zIndex: open ? 3000 : 1 }]}>
                        <Text style={[sharedStyles.label, { color: theme.textColor }]}>Activity *</Text>
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
                        <ReusableButton
                            title="Cancel"
                            onPress={handleCancel}
                            color="secondary"
                        />
                        <ReusableButton
                            title="Save"
                            onPress={handleSave}
                            color="primary"
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
        paddingRight: 30,
        paddingTop: 5
    },
    deleteButton: {
        position: 'absolute',
        right: 15,
        paddingTop: 40
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

