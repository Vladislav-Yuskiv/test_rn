import {ThemeMode} from "./types";

export interface IConfig {
    userName:string,
    currentMode:  ThemeMode,
    fontFamily: "SpaceMono" | "Inter" | "Sevillana",
    fontSize: number,
    iconSize: number,
    iconColor: string,
    backgroundImage: string
}

export interface ITabIconProps {
    focused: boolean;
    size: number;
    fill: string
}

export interface IColorsInterface {
    text: string
    background: string
    secondaryBackground: string
    titleColor:string
    tabIconDefault: string
    tabBarBackground:string
    tabActive: string
    tabInActive: string
}
