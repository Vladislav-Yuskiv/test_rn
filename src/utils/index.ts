import Colors from "./Colors";
import {ChangedColorsByUser} from "../types/types";

export function getCurrentColor(
    theme: "light" | "dark",
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
    changedColorsByUser: ChangedColorsByUser = { light: {}, dark: {}}
) {

    return {
        light: {
            ...Colors.light,
            ...changedColorsByUser.light
        },
        dark: {
            ...Colors.dark,
            ...changedColorsByUser.dark
        }
    }[theme][colorName];
}