import {View,Text} from "react-native";
import {HomeScreenProps} from "../../types/screenTypes";

export default function HomeScreen({}:HomeScreenProps){

    return  (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home screen</Text>
        </View>
    )
}