import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


// connect 
const AuthContext = createContext()

// provider
const AuthProvider = () => {
    const [state, setState] = useState({
        user: null,
        token: "",
    })

    // initial local storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data)
            setState({ ...state, user:data?.user, token: data?.token })
        }
        loadLocalStorageData()
    }, [])

    return (
        <AuthContext.Provider value={[state, setState]}>
            {props.children}
            <xyz />
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
