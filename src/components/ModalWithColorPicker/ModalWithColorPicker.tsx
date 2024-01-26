import {Modal, Pressable, View,Text} from "react-native";
import {styles} from "./styles";

interface IModalWithColorPickerProps {
    modalVisible: boolean
    cancel: () => void
    defaultColor: string
    
}
export default function ModalWithColorPicker({
   modalVisible,
   cancel,
 }:IModalWithColorPickerProps){
    return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    cancel()
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => cancel()}
                        >

                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
    )
}