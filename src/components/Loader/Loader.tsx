import {ActivityIndicator, ActivityIndicatorProps} from "react-native";
import {styles} from "./styles";

export default function Loader(props :ActivityIndicatorProps){
    return (
        <ActivityIndicator style={styles.container} {...props}/>
    )
}