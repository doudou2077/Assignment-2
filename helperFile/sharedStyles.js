import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#4A55A2',  // Dark blue color from the screenshots
    secondary: '#7895CB', // Lighter blue color
    background: '#A0BFE0', // Light blue background color
    text: '#000000', // Black text color
    white: '#FFFFFF',
};


export const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        height: 100,  // Increase height to allow more space for the header
        paddingTop: 40,  // Set padding to make space for the status bar (adjust based on device)
        position: 'relative',
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        right: 15,
        paddingTop: 40,
    },
    addButtonText: {
        color: colors.white,
        fontSize: 16,
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
        justifyContent: 'space-between',
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
});

