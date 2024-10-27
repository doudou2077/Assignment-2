import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { sharedStyles, colors } from '../helperFile/sharedStyles';
import { useTheme } from '../context/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteFromDB } from '../firebase/firebaseHelper';
import ReusableButton from './ReusableButton';

export default function AddEditItemScreen({
    navigation,
    isEditMode,
    itemType,
    item,
    children,
    handleSave,
    isSpecial,
    setIsSpecial,
    isSpecialItem
}) {
    const { theme } = useTheme();

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleDelete = () => {
        // Get the correct collection name
        const collectionName = itemType === 'activity' ? 'activities' : 'diet';

        Alert.alert(
            "Delete",
            `Are you sure you want to delete this ${itemType} entry?`,
            [
                { text: "No", style: "cancel" },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await deleteFromDB(item.id, collectionName);
                            console.log(`${itemType} entry deleted:`, item.id);
                            navigation.goBack();
                        } catch (error) {
                            console.log(`Error deleting ${itemType} entry:`, error);
                            Alert.alert('Error', `Failed to delete ${itemType} entry.`);
                        }
                    },
                    style: 'destructive'
                }
            ]
        );
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

                <View style={sharedStyles.headerTextContainer}>
                    <Text style={styles.headerText}>{isEditMode ? 'Edit' : `Add ${itemType}`}</Text>
                </View>

                {isEditMode && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.deleteButton,
                            { opacity: pressed ? 0.7 : 1 }
                        ]}
                        onPress={handleDelete}
                    >
                        <AntDesign name="delete" size={24} color="white" style={{ paddingTop: 10 }} />
                    </Pressable>
                )}
            </View>

            <Pressable style={sharedStyles.centeredContainer}>
                <View style={sharedStyles.centeredContainer}>
                    {children}
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
    headerText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingTop: 10
    },
    deleteButton: {
        position: 'absolute',
        right: 15,
        paddingTop: 40
    },
});