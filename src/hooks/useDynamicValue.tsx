import {
    Context,
    createContext,
    PropsWithChildren, useCallback,
    useContext, useEffect, useLayoutEffect, useState
} from "react";
import {IColorsInterface, IConfig} from "../types/interfaces";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import {ChangedColorsByUser, ThemeMode} from "../types/types";
import {Appearance} from "react-native";
import getColorScheme = Appearance.getColorScheme;
import addChangeListener = Appearance.addChangeListener;
import userImg from "../utils/defaultUserImage";


interface IDynamicValueContext {
    config: IConfig,
    setConfigValue: (value: Partial<IConfig>) => Promise<void>,
    currentTheme: "light"| "dark",
    changeModeAndTheme: (mode:ThemeMode) => Promise<void>
    resetToDefaultSettings: () => Promise<void>
    saveColorsByUser: (value: ChangedColorsByUser) => Promise<void>
}

const defaultValue: IDynamicValueContext = {
    config: {
        userName: "Your name here",
        currentMode: "system",
        homeIcon: "5",
        settingsIcon: "6",
        iconColor: "red",
        fontFamily: "SpaceMono",
        fontSize: 14,
        iconSize: 18,
        userImage: userImg,
        changedColorsByUser: {
            light: {
                tabActive: "#000000",
                tabInActive: "#ffffff",
            },
            dark: {
                tabActive: "#FFFFFF",
                tabInActive: "#000000",
            }
        },
    },
    currentTheme: "light",
    setConfigValue: async () => undefined,
    changeModeAndTheme: async ()  => undefined,
    resetToDefaultSettings: async () => undefined,
    saveColorsByUser: async () => undefined
}

const DynamicValueContext: Context<IDynamicValueContext> =
    createContext<IDynamicValueContext>(defaultValue);
export const useDynamicValue: () => IDynamicValueContext = () =>
    useContext<IDynamicValueContext>(DynamicValueContext);
function DynamicValueProvider (props: PropsWithChildren<any>){

    const [config,  setConfig] = useState<IConfig>(defaultValue.config)
    const [currentTheme, setCurrentTheme] = useState<"light"| "dark">(defaultValue.currentTheme)

    //I decided to use AsyncStorage to simulate the working of a database.
    const { getItem, setItem } = useAsyncStorage('@config');


    //Here I get my config from storage
    const readItemFromStorage = async (): Promise<IConfig | null> => {
        try {
            const item = await getItem();
            //If item is null, I will assume that the  user opens the app for  the first time
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error in readItemFromStorage:', error);
            return null;
        }
    };

    const saveItemToStorage = async (value: IConfig) => {
        try {
            await setItem(JSON.stringify(value));
        } catch (error) {
            console.error('Error in saveItemToStorage:', error);
        }
    };


    useLayoutEffect(() => {
        const loadConfig = async () => {
            try {
                //Get config from storage
                const storedConfig: IConfig | null = await readItemFromStorage();

                if (!storedConfig) {
                    //User opens the app for the first time or something went wrong
                    const theme = getColorScheme() ?? 'light'; //  Get user theme
                    setCurrentTheme(theme)
                    const defaultConfig = defaultValue.config;
                    await saveItemToStorage(defaultConfig);
                    setConfig(defaultConfig);
                } else {
                    //User can choose theme - dark,light,system
                    const currentMode = storedConfig.currentMode
                    if(currentMode === "system"){
                        const theme = getColorScheme() ?? 'light';
                        setCurrentTheme(theme)
                    }else{
                        setCurrentTheme(currentMode)
                    }
                    setConfig(storedConfig);
                }
            } catch (error) {
                console.error('Error loading config:', error);
            }
        };

        loadConfig()

    }, []);

    const handleChange = useCallback(({colorScheme}: any)=> {
        //Theme will be change only if user have mode - system
        if(config.currentMode === "system"){
            setCurrentTheme(colorScheme)
        }
    },[config])

    useEffect(() => {
        const subscription = addChangeListener(handleChange);

        return () => {
            subscription.remove();
        };
    }, [handleChange]);


    async function setConfigValue(value: Partial<IConfig>){
        const objToSave = {
            ...config,
            ...value
        }
        setConfig(objToSave)
        await saveItemToStorage(objToSave)
    }

    const changeModeAndTheme = async  (mode: "light"|"dark"|"system") => {
       await setConfigValue({currentMode: mode})

        if(mode === "system"){
            const theme = getColorScheme() ?? 'light';
            setCurrentTheme(theme)
        }else{
            setCurrentTheme(mode)
        }

    }

    const resetToDefaultSettings = async () => {
        const theme = getColorScheme() ?? 'light'; //  Get user theme
        setCurrentTheme(theme)
        const defaultConfig = defaultValue.config;
        setConfig(defaultConfig);
        await saveItemToStorage(defaultConfig);
    }

    const saveColorsByUser = async (value: ChangedColorsByUser) => {
        const result:ChangedColorsByUser = {
            light: {
                ...config.changedColorsByUser.light,
                ...value?.light
            },
            dark: {
                ...config.changedColorsByUser.dark,
                ...value?.dark
            }
        }

        const newConfig = {...config, changedColorsByUser: result}
        setConfig(newConfig);
        await saveItemToStorage(newConfig);

    }
    return (
        <DynamicValueContext.Provider
            value={{
                config,
                setConfigValue,
                currentTheme,
                changeModeAndTheme,
                resetToDefaultSettings,
                saveColorsByUser
            }}
        >
            {props.children}
        </DynamicValueContext.Provider>
    )
}

export const withDynamicConfigProvider = (Component: any) => (p: any) =>
    (
        <DynamicValueProvider>
            <Component {...p} />
        </DynamicValueProvider>
    );