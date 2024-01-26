import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    pickerContainer: {
        bottom: 0,
        position: 'absolute',
        maxHeight: 250,
        minHeight: 100,
        overflow: "hidden",
        width: '100%',
        backgroundColor: 'white',
    },
    label: {
        textTransform: 'capitalize',
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(240,240,240)',
    },
    link: {
        color: 'rgb(56,143,245)',
        padding: 15,
        fontSize: 16
    },
    picker: {
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#EBEBEB',
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
    }
});