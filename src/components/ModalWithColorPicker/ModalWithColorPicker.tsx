import {Modal, Pressable, TouchableOpacity, View as RNView} from "react-native";
import { View , Text} from "../CustomThemeComponents"
import {styles} from "./styles";
import {IColorPickerModalConfig} from "../../types/interfaces";
import React, {useEffect, useState} from "react";
import ColorPicker, { Panel1, Preview, Swatches} from "reanimated-color-picker";
import {getCurrentColor} from "../../utils";
import Loader from "../Loader";

interface IModalWithColorPickerProps {
    modalConfig: IColorPickerModalConfig
    cancel: () => void
}

export default function ModalWithColorPicker({
   modalConfig,
   cancel,
 }:IModalWithColorPickerProps){

    const [value, setValue] = useState("")

    useEffect(() => {
        setValue(modalConfig.default)
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

                            {/*// I added loader because I get error from ColorPicker lib*/}
                            {
                                !value
                                    ? <Loader style={styles.modalText} size={"small"}/>
                                    : (
                                        <ColorPicker style={{ width: '70%' }} value={value} onComplete={(color) => setValue(color.hex)}>
                                            <Preview style={styles.previewStyles}/>
                                            <View>
                                                <Panel1 />
                                            </View>
                                            <Swatches style={styles.swatchesStyles} />
                                        </ColorPicker>
                                    )
                            }


                            <TouchableOpacity
                                style={{
                                    ...styles.saveButton,
                                    backgroundColor: getCurrentColor(modalConfig.currentTheme,"secondaryBackground")
                                }}
                                onPress={async () => {
                                    await  modalConfig.onSave(value)
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