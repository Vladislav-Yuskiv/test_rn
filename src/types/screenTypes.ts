import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

export type BottomTabParamList = {
    Home: undefined;
    Settings: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>
export type SettingsScreenProps = BottomTabScreenProps<BottomTabParamList, 'Settings'>