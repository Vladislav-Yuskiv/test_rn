import {
    Context,
    createContext,
    PropsWithChildren,
    useContext, useLayoutEffect, useState
} from "react";
import {IConfig} from "../types/interfaces";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

interface IDynamicValueContext {
    config: IConfig,
    setConfigValue: (value: Partial<IConfig>) => void
}

const defaultValue: IDynamicValueContext = {
    config: {
        iconColor: "red",
        fontFamily: "SpaceMono",
        iconSize: 18,
        backgroundImage: ""
    },
    setConfigValue: () => undefined
}

const DynamicValueContext: Context<IDynamicValueContext> =
    createContext<IDynamicValueContext>(defaultValue);
export const useDynamicValue: () => IDynamicValueContext = () =>
    useContext<IDynamicValueContext>(DynamicValueContext);
function DynamicValueProvider (props: PropsWithChildren<any>){

    const [config,  setConfig] = useState<IConfig>(defaultValue.config)

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
                const item: IConfig | null = await readItemFromStorage();

                if (!item) {
                    //Save default config
                    await saveItemToStorage(defaultValue.config);
                    setConfig(defaultValue.config);
                } else {
                    //User opens the app for the first time or something went wrong
                    setConfig(item);
                }
            } catch (error) {
                console.error('Error loading config:', error);
            }
        };

        loadConfig()
    }, []);

    async function setConfigValue(value: Partial<IConfig>){
        const objToSave = {
            ...config,
            ...value
        }
        setConfig(objToSave)
        await saveItemToStorage(objToSave)
    }

    return (
        <DynamicValueContext.Provider
            value={{
                config,
                setConfigValue
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