import {View,Text} from "../../components/CustomThemeComponents";
import {HomeScreenProps} from "../../types/screenTypes";
import {Alert, ScrollView, TouchableOpacity} from "react-native";
import {useDynamicValue} from "../../hooks/useDynamicValue";
import {styles} from "./styles";
import {getCurrentColor} from "../../utils";

export default function HomeScreen({}:HomeScreenProps){

    const {
        config,
        setConfigValue,
        currentTheme
    } = useDynamicValue()
    return  (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    ...styles.nameWrapper,
                    backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                }}
                onPress={() => {
                    Alert.prompt(
                        "Enter your name",
                        "",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {
                                text: "OK",
                                onPress: name => setConfigValue({userName: name })
                            }
                        ],
                        "plain-text"
                    );
                }}
            >
                <Text style={styles.userNameText}>{config.userName}</Text>
            </TouchableOpacity>

            <ScrollView
                style={styles.textWrapper}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac luctus est. Duis interdum dui sit amet efficitur maximus. Nulla bibendum sapien sit amet orci auctor, quis luctus purus fermentum. Phasellus pulvinar aliquam rhoncus. Duis vel lorem facilisis, interdum elit vel, lacinia leo. Nulla ullamcorper dui ac nulla accumsan tristique. Nunc mattis tincidunt nibh at auctor. Etiam lobortis justo nisl, ac maximus mauris porta ut. Vivamus tempus sed augue ac aliquet. Donec vel enim ut nisl semper fermentum. Ut fermentum nisl ac sem ornare, sit amet blandit erat varius. Donec tristique tortor et mauris viverra, a mollis turpis eleifend.
                    Suspendisse pulvinar ipsum orci, eget scelerisque nibh dictum eu. Praesent scelerisque posuere mi, vel tincidunt libero semper ut. Nunc suscipit odio auctor ex ultricies porttitor. Nulla sed magna nec ipsum hendrerit luctus quis nec tortor. Maecenas commodo lorem non libero scelerisque sodales. Nulla vitae erat nec neque vestibulum eleifend vitae at justo. Vivamus et commodo ipsum. Sed eget libero varius, lacinia ipsum et, congue nulla. In hac habitasse platea dictumst. Duis malesuada lacus nec tortor tincidunt, non luctus risus tincidunt. Morbi gravida lacus vulputate ante vulputate, varius accumsan sapien ultrices. Ut cursus vestibulum orci. Fusce porttitor sed quam at congue. Duis ut nunc pretium, porttitor ligula ac, facilisis augue.
                </Text>
            </ScrollView>
        </View>
    )
}