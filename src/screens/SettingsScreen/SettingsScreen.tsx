import {View as RNView, TouchableOpacity, Pressable, ScrollView} from "react-native";
import { View , Text} from "../../components/CustomThemeComponents"
import {SettingsScreenProps} from "../../types/screenTypes";
import { useState} from "react";
import {useDynamicValue} from "../../hooks/useDynamicValue";
import ModalPicker from "../../components/ModalPicker";
import {styles} from "./styles";
import {getCurrentColor} from "../../utils";
import {ThemeMode} from "../../types/types";
import ModalWithColorPicker from "../../components/ModalWithColorPicker";
import {IColorPickerModalConfig} from "../../types/interfaces";
import {TEST_ICONS} from "../../utils/TestIcons";
import HomeIcon from "../../components/svgs/HomeIcon";
import SettingsIcon from "../../components/svgs/SettingsIcon";
import ModalSelectIcons from "../../components/ModalSelectIcons";

type ModelVariability = "mode"| "fontFamily" | "fontSize" | "iconSize" | "";

const modeData = [
    { label:"Dark mode", value: "dark"},
    { label:"Light mode", value: "light"},
    { label:"System/Automatic mode", value: "system"}
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

const iconSizeData = [
    { label:"15", value: "15"},
    { label:"16", value: "16"},
    { label:"17", value: "17"},
    { label:"18", value: "18"},
    { label:"19", value: "19"},
    { label:"20", value: "20"},
    { label:"21", value: "21"},
    { label:"22", value: "22"},
    { label:"23", value: "23"},
    { label:"24", value: "24"},
    { label:"25", value: "25"},
    { label:"26", value: "26"},
]

const defaultModalConfig: IColorPickerModalConfig = {
    isOpen: false,
    title: "",
    currentTheme: "light",
    default: "",
    onSave: async () => console.log("Save")
}


export default function SettingsScreen({}:SettingsScreenProps){

    const {
        config,
        currentTheme,
        setConfigValue,
        changeModeAndTheme,
        saveColorsByUser
    } = useDynamicValue()


    const [visible, setVisible] = useState<ModelVariability>("")
    const [modalWithPickerConfig, setModalConfig] = useState<IColorPickerModalConfig>(defaultModalConfig)
    const [modalWithIconsConfig, setModalWithIconsConfig] = useState<IColorPickerModalConfig>(defaultModalConfig)

    const CurrentHomeIcon = TEST_ICONS.find(testIcon => testIcon.id === config.homeIcon)?.icon || HomeIcon
    const CurrentSettingsIcon = TEST_ICONS.find(testIcon => testIcon.id === config.settingsIcon)?.icon || SettingsIcon
    const getDataDependOnSection = () =>{
        switch (visible) {
            case "mode":
                return modeData
            case "fontFamily":
                return fontFamilyData
            case "fontSize":
                return fontSizeData
            case "iconSize":
                return iconSizeData
            default:
                return modeData
        }
    }

    const getDefaultDependOnSection = () =>{
        switch (visible) {
            case "mode":
                return config.currentMode
            case "fontFamily":
                return config.fontFamily
            case "fontSize":
                return config.fontSize.toString()
            case "iconSize":
                return config.iconSize.toString()
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
            case "iconSize":
                await setConfigValue({iconSize: Number(item)})
                break;
        }

        setVisible("")
    }


    return  (
        <ScrollView
            style={{
                ...styles.container,
                backgroundColor: getCurrentColor(currentTheme,"background",config.changedColorsByUser)
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
        >

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
                Customize background color in app
            </Text>

            <RNView style={styles.flexWrapper}>

                <RNView style={{width: "40%"}}>
                    <Text
                        style={{
                            ...styles.themeColumn,
                            textAlign:"center",
                            color: getCurrentColor(currentTheme,"titleColor"),
                            backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                        }}
                    >
                        Dark mode
                    </Text>

                    <Pressable
                         style={{
                             justifyContent: "center",
                             alignItems: "center",
                         }}
                         onPress={() =>
                             setModalConfig({
                                     isOpen: true,
                                     title: "Change background color in APP for LIGHT mode",
                                     currentTheme: currentTheme,
                                     default: getCurrentColor("dark", "background",config.changedColorsByUser),
                                     onSave: async (value) =>
                                         await saveColorsByUser({
                                             dark: {
                                                 background: value
                                             }
                                         })
                                 }
                             )}
                    >
                        <Text>Current app background</Text>
                        <RNView style={{
                            ...styles.wrapperForColor,
                            marginTop: 10,
                            backgroundColor: getCurrentColor("dark", "background",config.changedColorsByUser)
                        }}/>
                    </Pressable>

                </RNView>

                <RNView style={{width: "40%"}}>
                    <Text
                        style={{
                            ...styles.themeColumn,
                            textAlign:"center",
                            backgroundColor: getCurrentColor(currentTheme,"secondaryBackground"),
                            color: getCurrentColor(currentTheme,"titleColor"),
                        }}
                    >
                        Light mode
                    </Text>

                    <Pressable
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onPress={() =>
                            setModalConfig({
                                    isOpen: true,
                                    title: "Change background color in APP for LIGHT mode",
                                    currentTheme: currentTheme,
                                    default: getCurrentColor("light", "background",config.changedColorsByUser),
                                    onSave: async (value) =>
                                        await saveColorsByUser({
                                            light: {
                                                background: value
                                            }
                                        })
                                }
                            )}
                    >
                        <Text>Current App background</Text>

                        <RNView style={{
                            ...styles.wrapperForColor,
                            marginTop: 10,
                            backgroundColor: getCurrentColor("light", "background",config.changedColorsByUser)
                        }}/>
                    </Pressable>
                </RNView>

            </RNView>

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
                            onPress={() =>
                                setModalConfig({
                                    isOpen: true,
                                    title: "Change ACTIVE color for DARK mode",
                                    currentTheme: currentTheme,
                                    default: getCurrentColor("dark", "tabActive",config.changedColorsByUser),
                                    onSave: async (value) =>
                                        await saveColorsByUser({
                                            dark: {
                                                tabActive: value
                                            }
                                        })
                                }
                            )}
                        >
                            <Text>Active</Text>
                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("dark", "tabActive",config.changedColorsByUser)
                            }}/>
                        </Pressable>

                        <Pressable
                            style={styles.flexWrapper}
                            onPress={() =>
                                setModalConfig({
                                        isOpen: true,
                                        title: "Change INACTIVE color for DARK mode",
                                        currentTheme: currentTheme,
                                        default: getCurrentColor("dark", "tabInActive",config.changedColorsByUser),
                                        onSave: async (value) =>
                                            await saveColorsByUser({
                                                dark: {
                                                    tabInActive: value
                                                }
                                            })
                                    }
                                )}
                        >
                            <Text>InActive</Text>
                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("dark", "tabInActive",config.changedColorsByUser)
                            }}/>
                        </Pressable>
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

                        <Pressable
                            style={styles.flexWrapper}
                            onPress={() =>
                                setModalConfig({
                                        isOpen: true,
                                        title: "Change ACTIVE color for LIGHT mode",
                                        currentTheme: currentTheme,
                                        default: getCurrentColor("light", "tabActive",config.changedColorsByUser),
                                        onSave: async (value) =>
                                            await saveColorsByUser({
                                                light: {
                                                    tabActive: value
                                                }
                                            })
                                    }
                                )}
                        >
                            <Text>Active</Text>

                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("light", "tabActive",config.changedColorsByUser)
                            }}/>
                        </Pressable>
                        <Pressable
                            style={styles.flexWrapper}
                            onPress={() =>
                                setModalConfig({
                                        isOpen: true,
                                        title: "Change INACTIVE color for LIGHT mode",
                                        currentTheme: currentTheme,
                                        default: getCurrentColor("light", "tabInActive",config.changedColorsByUser),
                                        onSave: async (value) =>
                                            await saveColorsByUser({
                                                light: {
                                                    tabInActive: value
                                                }
                                            })
                                    }
                                )}
                        >
                            <Text>InActive</Text>
                            <RNView style={{
                                ...styles.wrapperForColor,
                                backgroundColor: getCurrentColor("light", "tabInActive",config.changedColorsByUser)
                            }}/>
                        </Pressable>
                    </RNView>
                </RNView>

                <Text style={styles.centerText}>
                    Tab Icons
                </Text>
                <RNView style={styles.flexWrapper}>
                    <RNView>
                        <Text>Home Tab</Text>

                        <Pressable
                            style={{
                                ...styles.iconItem,
                                padding: config.iconSize,
                                backgroundColor: getCurrentColor(currentTheme,"secondaryBackground"),
                            }}
                            onPress={() =>
                                setModalWithIconsConfig({
                                        isOpen: true,
                                        title: "Change Home Icon",
                                        currentTheme: currentTheme,
                                        default: config.homeIcon,
                                        onSave: async (value) =>
                                            await setConfigValue({
                                                homeIcon: value
                                            }),
                                        additional: {
                                            color: config.iconColor,
                                            size: config.iconSize
                                        }
                                    }
                                )}
                        >
                            <CurrentHomeIcon
                                size={config.iconSize}
                                fill={config.iconColor}
                            />
                        </Pressable>
                    </RNView>
                   <RNView>
                       <Text>Settings Tab</Text>

                       <Pressable
                           style={{
                               ...styles.iconItem,
                               padding: config.iconSize,
                               backgroundColor: getCurrentColor(currentTheme,"secondaryBackground"),
                           }}
                           onPress={() =>
                               setModalWithIconsConfig({
                                       isOpen: true,
                                       title: "Change Settings Icon",
                                       currentTheme: currentTheme,
                                       default: config.settingsIcon,
                                       onSave: async (value) =>
                                           await setConfigValue({
                                               settingsIcon: value
                                           }),
                                       additional: {
                                           color: config.iconColor,
                                           size: config.iconSize
                                       }
                                   }
                               )}
                       >
                           <CurrentSettingsIcon
                               size={config.iconSize}
                               fill={config.iconColor}
                           />
                       </Pressable>
                   </RNView>
                </RNView>

                <Text style={styles.centerText}>
                    Tab/Header Background
                </Text>

                <RNView style={styles.flexWrapper}>
                    <Pressable
                        style={styles.wrapperForBackgroundOption}
                        onPress={() =>
                            setModalConfig({
                                    isOpen: true,
                                    title: "Change Background color for LIGHT mode",
                                    currentTheme: currentTheme,
                                    default: getCurrentColor("light", "tabBarBackground",config.changedColorsByUser),
                                    onSave: async (value) =>
                                        await saveColorsByUser({
                                            light: {
                                                tabBarBackground: value
                                            }
                                        })
                                }
                            )}
                    >
                        <Text>Light mode background</Text>

                        <RNView style={{
                            ...styles.wrapperForColor,
                            marginTop: 10,
                            backgroundColor: getCurrentColor("light", "tabBarBackground",config.changedColorsByUser)
                        }}/>
                    </Pressable>
                    <Pressable
                        style={styles.wrapperForBackgroundOption}
                        onPress={() =>
                            setModalConfig({
                                    isOpen: true,
                                    title: "Change Background color for DARK mode",
                                    currentTheme: currentTheme,
                                    default: getCurrentColor("dark", "tabBarBackground",config.changedColorsByUser),
                                    onSave: async (value) =>
                                        await saveColorsByUser({
                                            dark: {
                                                tabBarBackground: value
                                            }
                                        })
                                }
                            )}
                    >
                        <Text>Dark mode background</Text>
                        <RNView style={{
                            ...styles.wrapperForColor,
                            marginTop: 10,
                            backgroundColor: getCurrentColor("dark", "tabBarBackground",config.changedColorsByUser)
                        }}/>
                    </Pressable>
                </RNView>
            </RNView>
            <RNView style={{paddingBottom: 40}}>
                <Text
                    style={{
                        ...styles.sectionTitle,
                        fontSize: config.fontSize + 5,
                    }}
                >
                    Color and size for ALL icons
                </Text>

                <RNView style={styles.flexWrapper}>
                    <Pressable
                        style={styles.wrapperForBackgroundOption}
                        onPress={() => setVisible("iconSize")}
                    >
                        <Text>Icon size</Text>
                        <RNView
                            style={{
                                marginTop: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                width: 40 + config.iconSize,
                                height: 40  + config.iconSize,
                                backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                            }}
                        >
                            <Text>{config.iconSize}</Text>
                        </RNView>
                    </Pressable>

                    <Pressable
                        style={styles.wrapperForBackgroundOption}
                        onPress={() =>
                            setModalConfig({
                                    isOpen: true,
                                    title: "Change  COLOR for ALL icons",
                                    currentTheme: currentTheme,
                                    default: config.iconColor,
                                    onSave: async (value) =>
                                        await setConfigValue({iconColor: value})
                                }
                            )}
                    >
                        <Text>Icon color</Text>
                        <RNView style={{
                            ...styles.wrapperForColor,
                            marginTop: 10,
                            backgroundColor: config.iconColor
                        }}/>
                    </Pressable>
                </RNView>
            </RNView>


            <ModalWithColorPicker
                  modalConfig={modalWithPickerConfig}
                  cancel={() => setModalConfig(defaultModalConfig)}
            />

            <ModalSelectIcons
                modalConfig={modalWithIconsConfig}
                cancel={() => setModalWithIconsConfig(defaultModalConfig)}
            />

            <ModalPicker
                isVisible={Boolean(visible)}
                selectedValue={getDefaultDependOnSection()}
                data={getDataDependOnSection()}
                cancel={() => setVisible("")}
                fontFamily={config.fontFamily}
                save={handleSaveChanges}
            />

        </ScrollView>
    )
}
