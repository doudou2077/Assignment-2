import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#4A55A2',  // Dark blue color from the screenshots
    secondary: '#7895CB', // Lighter blue color
    background: '#A0BFE0', // Light blue background color
    text: '#000000', // Black text color
    white: '#FFFFFF', // White color for backgrounds and text
    darkMode: '#191970', // Dark blue color for dark mode background
};


export const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: 100,
        paddingTop: 40,
        paddingHorizontal: 15,
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 70
    },
    iconContainer: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 7,
    },

    addButton: {
        position: 'absolute', // Position the add button absolutely within the header
        right: 15,
        paddingTop: 40,
    },
    addButtonText: {
        color: colors.white,
        fontSize: 16,
    },
    goBackButton: {
        position: 'absolute',
        left: 15,
        paddingTop: 40,
        padding: 15,
        zIndex: 1,
    },
    goBackButtonText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: 20
    },

    centeredContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    formElement: {
        width: '100%', // Full width for form elements
        marginBottom: 20,
    },

    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space buttons evenly
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        position: 'absolute',
        right: 15,
        top: 50,
    },
});

