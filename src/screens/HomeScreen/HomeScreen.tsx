import {View,Text} from "../../components/CustomThemeComponents";
import {HomeScreenProps} from "../../types/screenTypes";
import {Alert, ScrollView, TouchableOpacity,Image,ImageSourcePropType} from "react-native";
import {useDynamicValue} from "../../hooks/useDynamicValue";
import {styles} from "./styles";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import {getCurrentColor} from "../../utils";
import {TEST_ICONS} from "../../utils/TestIcons";

export default function HomeScreen({}:HomeScreenProps){

    const {
        config,
        setConfigValue,
        currentTheme
    } = useDynamicValue()

    const selectPicture = async () => {
        if (!(await MediaLibrary.getPermissionsAsync())) {
            await MediaLibrary.requestPermissionsAsync();
        }

        const photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
        });

        if (photo.canceled) {
            return;
        }

        const resultPhoto = await ImageManipulator.manipulateAsync(
            photo.assets[0].uri,
            [{ resize: { height: 50 } }],
            {
                compress: 0.9,
                format: ImageManipulator.SaveFormat.JPEG,
                base64: true,
            }
        );

        await setConfigValue({
            userImage: "data:image/jpg;base64," + resultPhoto.base64
        })
    }
    return  (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.userImageWrapper}
                onPress={() => selectPicture()}
            >
                <View style={{
                    ...styles.userImgWrapper,
                    backgroundColor: getCurrentColor(currentTheme,"secondaryBackground")
                }}>
                        <Image source={{ uri: config.userImage } as ImageSourcePropType} style={styles.userPic} />
                </View>
            </TouchableOpacity>
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

            <Text
                style={{
                    ...styles.centerText,
                    fontSize: config.fontSize + 5
                }}
            >
                Test Icons
            </Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.testIconsWrapper}
            >
                {
                    TEST_ICONS.map(testIcon => {
                        const Icon = testIcon.icon

                        const iconFill =  config.iconColor
                        const iconSize = config.iconSize

                        return (
                            <View
                                key={testIcon.id}
                                style={{
                                    ...styles.testIconWrapper,
                                    padding: iconSize ,
                                    backgroundColor: getCurrentColor(currentTheme,"secondaryBackground"),
                                }}
                            >
                                <Icon size={iconSize} fill={iconFill}/>
                            </View>
                        )
                    })

                }
            </ScrollView>

            <Text
                style={{
                    ...styles.centerText,
                    fontSize: config.fontSize + 5
                }}
            >
                Story
            </Text>
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