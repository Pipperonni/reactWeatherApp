import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, getDoc, doc, addDoc, collectionGroup, query } from '@firebase/firestore'
import { AuthContext } from "./AuthProvider"



export const DataContext = createContext()

export const DataProvider = function(props){
    const [towns, setTowns] = useState([])
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const [data, setData] = useState({})
    const { user, userId} = useContext(AuthContext)
    const [cty, setCty] = useState([])

    
    
    const db = getFirestore()
    
    useEffect(() => {
        async function getTowns(){
            const postQuery = query(collectionGroup(db, 'cities'))
            const querySnapshot = await getDocs(postQuery) 
            const loadedPosts = []
            querySnapshot.forEach((doc) => {
                loadedPosts.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
            })
            console.log(loadedPosts)
            console.log(userId)
            setTowns(loadedPosts)
            
            
        }   
        getTowns()
    }, [])       
    
    
    
    
    
        function getCitys(){
            const usersCities = []
            for ( let i =0; i<towns.length-1; i++){
                console.log(i)
                if (towns[i].uid == userId){
                    usersCities.push(towns[i])
                    console.log(towns[i].uid)
                }
            }
            
            return usersCities
        }

    console.log(cty)

    async function getTown(uid, id){
        const docRef = doc(db, 'users', uid, 'cities', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${docSnap.data().town}&appid=${API_KEY}`)
            const data = await response.json()
            setData(data)
            return data    
        } else {
        throw new Error()
        }
    }

    async function addTown(town){
        const newTown = {
            town
        }
        const docRef = await addDoc(collection(db, 'users', user.uid, "cities"), newTown)
        newTown.id = docRef.id
        setTowns([
            newTown,
            ...towns
        ])
        window.location.reload(false)
        return newTown
    }

    const value = {
        towns,
        getTown,
        addTown,
        data,
        getCitys
        
        
        
    }
    return(
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}