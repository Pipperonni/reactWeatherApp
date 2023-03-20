import { useState, useEffect, useContext  } from "react";
import CitiesWeather from "../components/CitiesWeather";
import { DataContext } from "../contexts/DataProvider";
import TownForm from '../components/TownForm'
import { AuthContext } from '../contexts/AuthProvider';

export default function Home(){
    const { getCitys } = useContext(DataContext)
    const { user } = useContext(AuthContext)
    const { login, logout } = useContext(AuthContext)
    
    return(
        <div className="profileBox">
            {
                user.loggedIn ?
                <>
                    <div className="logOutBox">
                        <button className="logOutBtn" onClick={logout}>Logout</button>
                        <p className="userName">Welcome {user.displayName}</p>
                    </div>
                    {
                        user.loggedIn ?
                            <div className="inputForm">
                                <TownForm />
                            </div>  :
                            <></>
                    }
                    
                    <div id='cityBox' className="cityBox">
                        {getCitys().map((city) => <CitiesWeather city={city} key={city.id}/>)}
                    </div>
                </> :
                <>
                    <div className="signInView">
                        <h1 className="signInLabel">℃'MY Weather App <br/> Sign In to View Profile</h1>
                        <button className="logInBtn" onClick={login}>Login</button>
                    </div>
                </>
            }
        </div>
    )
}