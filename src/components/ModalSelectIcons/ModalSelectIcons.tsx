import React, {useEffect, useState} from "react";
import {Modal, Pressable, TouchableOpacity, View as RNView} from "react-native";
import {styles} from "./styles";
import {Text, View} from "../CustomThemeComponents";
import {getCurrentColor} from "../../utils";
import {IColorPickerModalConfig} from "../../types/interfaces";
import {TEST_ICONS} from "../../utils/TestIcons";

interface IModalSelectIconsProps {
    modalConfig: IColorPickerModalConfig
    cancel: () => void
}
export default function ModalSelectIcons({modalConfig,cancel}:IModalSelectIconsProps){

    const [selectedId, setId] = useState(modalConfig.default)

    useEffect(() => {
        setId(modalConfig.default)
    }, [modalConfig]);

    return(
        <Modal
            animationType="none"
            transparent={true}
            visible={modalConfig.isOpen}
            onRequestClose={() => {
                cancel()
            }}>

            <Pressable style={styles.modalBackdrop} onPress={cancel}>
                <View style={styles.modalView}>

                    <Text style={styles.modalText}>{modalConfig.title}</Text>

                    <RNView style={styles.testsIconWrapper}>
                        {TEST_ICONS.map(testIcon => {
                            const Icon = testIcon.icon

                            const iconFill =  modalConfig.additional?.color || "#ffffff"
                            const iconSize = modalConfig.additional?.size || 14

                            return (
                                <Pressable
                                    key={testIcon.id}
                                    onPress={() => setId(testIcon.id)}
                                    style={{
                                        ...styles.testIconWrapper,
                                        borderColor: "red",
                                        borderWidth: testIcon.id == selectedId ? 2 : 0,
                                        padding: iconSize,
                                        backgroundColor: getCurrentColor(modalConfig.currentTheme,"secondaryBackground"),
                                    }}
                                >
                                    <Icon size={iconSize} fill={iconFill}/>
                                </Pressable>
                            )
                        })}
                    </RNView>

                    <TouchableOpacity
                        style={{
                            ...styles.saveButton,
                            backgroundColor: getCurrentColor(modalConfig.currentTheme,"secondaryBackground")
                        }}
                        onPress={async () => {
                            await  modalConfig.onSave(selectedId)
                            cancel()
                        }}
                    >

                        <Text style={styles.textStyle}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    )
}