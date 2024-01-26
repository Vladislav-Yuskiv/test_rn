import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha (last parameter) for transparency
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    saveButton:{
        padding: 10,
        width: 100,
        height: 50,
        backgroundColor: "red",
        borderRadius:10
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    testsIconWrapper: {
        flexWrap:"wrap",
        flexDirection: "row",
        marginBottom: 15
    },
    testIconWrapper: {
        justifyContent:"center",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10
    },
})