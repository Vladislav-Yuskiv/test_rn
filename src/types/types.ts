import {IColorsInterface} from "./interfaces";

export type ThemeMode = "light"  | "dark" | "system"

export type ThemeColors = {
    [key in "light" | "dark"]:  IColorsInterface
};

export  type ChangedColorsByUser = {
    [key in "light" | "dark"] : Partial<IColorsInterface>
}