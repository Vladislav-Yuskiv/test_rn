import { Picker } from '@react-native-picker/picker'
import React, {useEffect, useState} from 'react'
import {Modal, View, Text, TouchableOpacity} from 'react-native'
import {styles} from "./styles";
import {PickerProps} from "@react-native-picker/picker/typings/Picker";;

interface IModalPickerProps extends PickerProps{
    isVisible:  boolean,
    cancel: () =>  void,
    fontFamily?: string,
    save: (v: string ) => void,
    selectedValue: string
    data: {label: string , value: string}[]
}


function ModalPicker({ isVisible, cancel, save, fontFamily, selectedValue, data, ...pickerProps }:IModalPickerProps) {

    const [item, setItem] = useState(selectedValue)

    useEffect(() => {
        setItem(selectedValue)
    }, [selectedValue, data, isVisible])


    return <Modal  transparent visible={isVisible} >
        <View style={styles.container} onTouchEndCapture={() => cancel()}>

        </View>

        <View style={styles.pickerContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={cancel}>
                    <Text style={styles.link}>{'Cancel'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    save(item)
                }}>
                    <Text style={[styles.link, { fontWeight: 'bold' }]}>{'Save'}</Text>
                </TouchableOpacity>
            </View>
            <Picker
                {...pickerProps}
                style={styles.picker}
                selectedValue={item}
                itemStyle={{
                    fontFamily
                }}
                onValueChange={(v: string ) => {
                    setItem(v)
                }}>
                {data.map(p=> <Picker.Item  key={p.value} {...p} />)}
            </Picker>
        </View>

    </Modal>
}

export default ModalPicker