import {View as RNView, TouchableOpacity, Modal, Pressable} from "react-native";
import { View , Text} from "../../components/CustomThemeComponents"
import {SettingsScreenProps} from "../../types/screenTypes";
import { useState} from "react";
import {useDynamicValue} from "../../hooks/useDynamicValue";
import ModalPicker from "../../components/ModalPicker";
import {styles} from "./styles";
import {getCurrentColor} from "../../utils";
import {ThemeMode} from "../../types/types";
import ModalWithColorPicker from "../../components/ModalWithColorPicker";

type ModelVariability = "mode"| "fontFamily" | "fontSize" | "";

const modeData = [
    { label:"Dark mode", value: "dark"},
    { label:"Light mode", value: "light"},
    { label:"System mode", value: "system"}
]
const fontFamilyData = [
    { label:"SpaceMono", value: "SpaceMono"},
    { label:"Inter", value: "Inter"},
    { label:"Sevillana", value: "Sevillana"}
]
const fontSizeData = [
    { label:"9", value: "9"},
    { label:"10", value: "10"},
    { label:"11", value: "11"},
    { label:"12", value: "12"},
    { label:"13", value: "13"},
    { label:"14", value: "14"},
    { label:"15", value: "15"},
    { label:"16", value: "16"},
    { label:"17", value: "17"},
    { label:"18", value: "18"},
    { label:"19", value: "19"},
    { label:"20", value: "20"},
    { label:"21", value: "21"},
    { label:"22", value: "22"},
]


export default function SettingsScreen({}:SettingsScreenProps){

    const {
        config,
        currentTheme,
        setConfigValue,
        changeModeAndTheme,
        changedColorsByUser,
    } = useDynamicValue()



    const [visible, setVisible] = useState<ModelVariability>("")
    const [isOpen, setOpen] = useState(false)

    const getDataDependOnSection = () =>{
        switch (visible) {
            case "mode":
                return modeData
            case "fontFamily":
                return fontFamilyData
            case "fontSize":
                return fontSizeData
            default:
                return modeData
        }
    }

    const getDefaultDependOnSection = () =>{
        switch (visible) {
            case "mode":
                return currentTheme
            case "fontFamily":
                return config.fontFamily
            case "fontSize":
                return config.fontSize.toString()
            default:
                return currentTheme
        }
    }

    const handleSaveChanges = async (item:string) => {

        switch (visible) {
            case "mode":
                await changeModeAndTheme(item as ThemeMode)
                break;
            case "fontFamily":
               await setConfigValue({fontFamily: item as "SpaceMono" | "Inter" | "Sevillana"})
               break;
            case "fontSize":
                await setConfigValue({fontSize: Number(item)})
                break;
        }

        setVisible("")
    }


    return  (
        <View style={styles.container}>

            <Text
                style={{
                    ...styles.sectionTitle,
                    fontSize: config.fontSize + 5,
                }}
            >
                Theme
            </Text>
            <TouchableOpacity
                onPress={() => setVisible("mode")}
                style={{
                    ...styles.changeWrapper,
                    backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                }}
            >
                <Text
                    style={{
                        color: getCurrentColor(currentTheme,"titleColor"),
                        fontSize: config.fontSize + 3
                    }}
                >
                    Change Mode: <Text>{config.currentMode}</Text>
                </Text>
            </TouchableOpacity>

            <Text
                style={{
                    ...styles.sectionTitle,
                    fontSize: config.fontSize + 5,
                }}
            >
                Fonts
            </Text>

            <TouchableOpacity
                onPress={() => setVisible("fontFamily")}
                style={{
                    ...styles.changeWrapper,
                    backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                }}
            >
                <Text
                    style={{
                        color: getCurrentColor(currentTheme,"titleColor"),
                        fontSize: config.fontSize + 3
                    }}
                >
                    Change font: <Text>{config.fontFamily}</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setVisible("fontSize")}
                style={{
                    ...styles.changeWrapper,
                    backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                }}
            >
                <Text
                    style={{
                        color: getCurrentColor(currentTheme,"titleColor"),
                        fontSize: config.fontSize + 3
                    }}
                >
                    Change font size: <Text>{config.fontSize}</Text>
                </Text>
            </TouchableOpacity>

            <Text
                style={{
                    ...styles.sectionTitle,
                    fontSize: config.fontSize + 5,
                }}
            >
                Customize colors in tab bar
            </Text>


            <RNView>
                <Text style={styles.centerText}>
                    Color for icon and label
                </Text>

                <RNView style={styles.flexWrapper}>

                    <RNView>
                        <Text
                            style={{
                                ...styles.themeColumn,
                                color: getCurrentColor(currentTheme,"titleColor"),
                                backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                            }}
                        >
                            Dark mode
                        </Text>

                        <Pressable
                            style={styles.flexWrapper}
                            onPress={() => setOpen(true)}
                        >
                            <Text>Active</Text>
                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("dark", "tabActive",changedColorsByUser)
                            }}/>
                        </Pressable>
                        <RNView style={styles.flexWrapper}>
                            <Text>InActive</Text>
                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("dark", "tabInActive",changedColorsByUser)
                            }}/>
                        </RNView>
                    </RNView>

                    <RNView>
                        <Text
                            style={{
                                ...styles.themeColumn,
                                backgroundColor: getCurrentColor(currentTheme,"secondaryBackground"),
                                color: getCurrentColor(currentTheme,"titleColor"),
                            }}
                        >
                            Light mode
                        </Text>

                        <RNView style={styles.flexWrapper}>
                            <Text>Active</Text>

                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("light", "tabActive",changedColorsByUser)
                            }}/>
                        </RNView>
                        <RNView style={styles.flexWrapper}>
                            <Text>InActive</Text>
                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("light", "tabInActive",changedColorsByUser)
                            }}/>
                        </RNView>
                    </RNView>

                </RNView>
            </RNView>



            <ModalWithColorPicker
              modalVisible={isOpen}
              cancel={() => setOpen(false)}
            />

            <ModalPicker
                isVisible={Boolean(visible)}
                selectedValue={getDefaultDependOnSection()}
                data={getDataDependOnSection()}
                cancel={() => setVisible("")}
                fontFamily={config.fontFamily}
                save={handleSaveChanges}
            />

        </View>
    )
}
