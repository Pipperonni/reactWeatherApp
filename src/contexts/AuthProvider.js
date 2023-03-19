import { useState, useEffect, createContext } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from '@firebase/auth'
import { async } from "@firebase/util";


export const AuthContext = createContext()

export const AuthProvider = function(props){

    const [user, setUser] = useState({
        loggedIn: false,
        checked: false
    })
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    async function login(){
        const result = await signInWithPopup(auth, provider)
        // result.user.loggedIn = true
        // setUser(result.user)
    }

    async function logout(){
        const result = await signOut(auth)
        // console.log(result)
        // setUser({
        //     loggedIn: false
        // })
    }

    useEffect(() =>{
        onAuthStateChanged(auth, (userData) => {
            if (userData){
                userData.loggedIn = true
                userData.checked = true
        setUser(userData)
            }else{
                setUser({
                    loggedIn: false,
                    checked: true
                })
            }
        })
    }, [])

    const value = {
        login,
        logout,
        user
    }

    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}