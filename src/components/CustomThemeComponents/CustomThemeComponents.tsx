import {StyleProp, Text as DefaultText, TextProps, View as DefaultView, ViewProps, ViewStyle} from 'react-native';
import {useDynamicValue} from "../../hooks/useDynamicValue";
import {getCurrentColor} from "../../utils";


export function Text(props: TextProps) {

    const {
        config: { fontFamily, fontSize} ,
        currentTheme
    } = useDynamicValue();


    const { style, ...otherProps } = props;

    const dynamicStylesForText = {
        fontFamily,
        fontSize,
        color: getCurrentColor(currentTheme,"text")
    }

    return <DefaultText style={[dynamicStylesForText,style]} {...otherProps} />;
}

export function View(props: ViewProps) {
    const {currentTheme} = useDynamicValue();


    const { style, ...otherProps } = props;

    const dynamicStylesForView: StyleProp<ViewStyle> = {
        backgroundColor: getCurrentColor(currentTheme,"background"),
    }

    return <DefaultView style={[style, dynamicStylesForView]} {...otherProps} />;
}