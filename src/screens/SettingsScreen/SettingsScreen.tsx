import {View,Text} from "react-native";
import {SettingsScreenProps} from "../../types/screenTypes";

export default function SettingsScreen({}:SettingsScreenProps){

    return  (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings screen</Text>
        </View>
    )
}
