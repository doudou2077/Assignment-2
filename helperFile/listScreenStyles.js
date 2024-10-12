import { StyleSheet } from 'react-native';
import { colors } from './sharedStyles';

export const listScreenStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background,
    },
    listItem: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    itemType: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.white,
        flex: 1,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: -6,
    },
    detailBox: {
        backgroundColor: colors.white,
        borderRadius: 5,
        padding: 5,
        marginLeft: 5,
    },
    detailText: {
        color: colors.primary,
        fontSize: 12,
    },
    icon: {
        marginLeft: 5,
    },
});