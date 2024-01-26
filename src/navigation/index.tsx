import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Text} from "../components/CustomThemeComponents";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {BottomTabParamList} from "../types/screenTypes";
import HomeIcon from "../components/svgs/HomeIcon";
import SettingsIcon from "../components/svgs/SettingsIcon";
import {useDynamicValue} from "../hooks/useDynamicValue";
import {getCurrentColor} from "../utils";
import {Alert, TouchableOpacity} from "react-native";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function AppNavigator() {

    const {
        currentTheme,
        config,
        resetToDefaultSettings
    } = useDynamicValue()

    const icons = {
        Home: HomeIcon,
        Settings: SettingsIcon ,
    };

    return (
        <BottomTab.Navigator
            screenOptions={({route}) => {
                const Icon = icons[route.name];

                return {
                    tabBarStyle: {
                        backgroundColor: getCurrentColor(currentTheme,"tabBarBackground"),
                        height: 100 + config.fontSize,
                    },
                    headerStyle: {
                        backgroundColor:getCurrentColor(currentTheme,"tabBarBackground"),
                    },
                    headerTitleStyle: {
                        color: getCurrentColor(currentTheme,"text"),
                        fontFamily: config.fontFamily,
                        fontSize: config.fontSize + 10,
                    },
                    tabBarLabel: (p) => {
                        return (
                            <Text
                                style={{
                                    color: p.focused
                                        ? getCurrentColor(currentTheme,"tabActive")
                                        : getCurrentColor(currentTheme,"tabInActive")
                                }}
                            >
                                {route.name}
                            </Text>
                        );
                    },
                    tabBarIcon: (p) => {
                        return (
                            <Icon
                                size={config.iconSize}
                                fill={
                                    p.focused
                                        ? getCurrentColor(currentTheme,"tabActive")
                                        : getCurrentColor(currentTheme,"tabInActive")
                                }
                                focused={p.focused}
                            />
                        );
                    }
                }

            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
            />
            <BottomTab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerRight: () => {
                        //This button will reset all to default config
                        return (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "red",
                                    padding: 7,
                                    borderRadius: 10,
                                }}
                                onPress={() => {
                                    Alert.alert("Are you sure?", "All data will be deleted", [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel"),
                                            style: "cancel"
                                        },
                                        {
                                            text: "Reset",
                                            onPress: () => resetToDefaultSettings(),
                                            style: "destructive",
                                        },
                                    ],{ userInterfaceStyle: currentTheme })
                                }}
                            >
                                <Text>Reset</Text>
                            </TouchableOpacity>
                        )
                    }}
                }/>

        </BottomTab.Navigator>
    );
}