import { StyleSheet } from 'react-native';
import { colors } from './sharedStyles';

export const listScreenStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text,
    },
    listItemSubtitle: {
        fontSize: 14,
        color: colors.text,
    },
});