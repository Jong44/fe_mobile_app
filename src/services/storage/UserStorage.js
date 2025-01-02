import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEYS ={
    USER_ID: 'USER_ID',
    USER_NAME: 'USER_NAME',
}

export const saveUserData = async (userId, userName) => {
    try {
        const stringUserId = userId.toString()
        await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, stringUserId)
        await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, userName)
    } catch (e) {
        console.error(e)
    }
}

export const getUserData = async () => {
    try {
        const userId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID)
        const userName = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME)
        return { userId, userName }
    } catch (e) {
        console.error(e)
    }
}

export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_ID)
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_NAME)
    } catch (e) {
        console.error(e)
    }
}