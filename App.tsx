import {NavigationContainer} from "@react-navigation/native";
import AppNavigator from "./src/navigation";
import {useDynamicValue, withDynamicConfigProvider} from "./src/hooks/useDynamicValue";
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from "expo-font";
import {useEffect} from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
function App() {

    const {config} = useDynamicValue();

    const [loaded, error] = useFonts({
        SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
        Inter: require("./assets/fonts/Inter-Regular.ttf"),
        Sevillana: require("./assets/fonts/Sevillana-Regular.ttf"),
    });

    useEffect(() => {
        //Here will be better to add  Error Boundary, but  I have not enough time
        if (error) throw error;
    }, [error]);


    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);


  return (
      <NavigationContainer>
          <AppNavigator/>
      </NavigationContainer>
  );
}

export default withDynamicConfigProvider(App)


