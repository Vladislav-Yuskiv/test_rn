import {StyleSheet} from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    changeWrapper: {
        height: 50,
        paddingLeft: 15,
        justifyContent:"center",
        borderRadius: 6,
        marginBottom: 20
    },
    sectionTitle:{
        marginBottom:10
    },
    centerText: {
       textAlign:"center",
        marginBottom: 10
    },
    flexWrapper: {
        justifyContent:"space-between",
        flexDirection:"row",
        alignItems: "center",
        marginBottom: 15
    },
    themeColumn: {
        padding: 5,
        marginBottom: 10,
    },
    iconItem: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: 10
    },
    wrapperForColor: {
        width: 30,
        height: 30,
        borderColor: "red",
        borderWidth: 1,
    },
    wrapperForBackgroundOption: {
        alignItems:"center",
        width: "40%"
    }
})