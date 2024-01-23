import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {BottomTabParamList} from "../types/screenTypes";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function AppNavigator() {

    const icons = {
        Home: null,
        Settings: null ,
    };

    return (
        <BottomTab.Navigator
            // screenOptions={({route}) => {
            //     const Icon = icons[route.name];
            // }}
        >
            <BottomTab.Screen name="Home" component={HomeScreen} />
            <BottomTab.Screen name="Settings" component={SettingsScreen} />
        </BottomTab.Navigator>
    );
}