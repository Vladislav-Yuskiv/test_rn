import {ChangedColorsByUser, ThemeMode} from "./types";

export interface IConfig {
    userName:string,
    currentMode:  ThemeMode,
    changedColorsByUser: ChangedColorsByUser,
    homeIcon: string,
    settingsIcon: string,
    fontFamily: "SpaceMono" | "Inter" | "Sevillana",
    fontSize: number,
    iconSize: number,
    iconColor: string,
    userImage: string
}

export interface IIconProps {
    focused?: boolean;
    size: number;
    fill: string
}

export interface IColorsInterface {
    text: string
    background: string
    secondaryBackground: string
    titleColor:string
    tabBarBackground:string
    tabActive: string
    tabInActive: string
}

export interface IColorPickerModalConfig{
    isOpen: boolean
    currentTheme: "light" | "dark"
    title: string
    default: string
    onSave: (value: string) => Promise<void>
    additional?: {
        color: string
        size: number
    }
}