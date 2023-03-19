import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import CitiesWeather from '../components/CitiesWeather'
import React from 'react';
import { DataContext } from "../contexts/DataProvider";
import { Link } from 'react-router-dom'


export default function PostSingle(){
    const { uid, id } = useParams()
    const [town, setTown] = useState({})
    const [error, setError] = useState(false)
    const { getTown } = useContext(DataContext)
    const [loadingState, setloadingState] = useState("LOADING")

    useEffect(() => {
        async function handleLoad(){
            try{
                const data = await getTown(uid, id)
                setTown(data)
                setloadingState("loaded")
            } catch(err){
                setError(true)
                console.log(err)
            }
        }
        handleLoad()
    }, [uid, id])

    return(
        <div className="App">
            {
                (loadingState === "LOADING") ?
                <p>Loading</p>:
                <>
                <div className="redirectLinkBox">
                    <Link className="redirectLink" to={'/'}>Back To Profile</Link>
                </div>
                <div className="weatherInfoMainBox">
                    <div className="weatherInfoCityBox">       
                        <h2 className="weatherInfoCityTitle">Today's Forecast For {town.name}</h2>
                    </div>
                    <div className="weatherInfoInnerBox">
                        <div className="weatherInfoBoxes">
                            <h3 className="boxTitle">Temperature</h3>
                            <div className="infoBox">
                            <p className="boxInfo">{Math.round((town.main.temp - 273.15) * 9/5 + 32)}℉</p>
                            </div>
                        </div>
                        <div className="weatherInfoBoxes">
                            <h3 className="boxTitle">Temperature Feels Like</h3>
                            <div className="infoBox">
                            <p className="boxInfo">{Math.round((town.main.feels_like - 273.15) * 9/5 + 32)}℉</p>
                            </div>
                        </div>
                        <div className="weatherInfoBoxes">
                            <h3 className="boxTitle">Temperature Max | Min</h3>
                            <div className="infoBox">
                            <p className="boxInfo">{Math.round((town.main.temp_max - 273.15) * 9/5 + 32)}℉ | {Math.round((town.main.temp_min - 273.15) * 9/5 + 32)}℉</p>
                            </div>
                        </div>
                        <div className="weatherInfoBoxes">
                            <h3 className="boxTitle">Weather Condition</h3>
                            <div className="infoBox">
                            <p className="boxInfo">{town.weather[0].main}</p>
                            </div>
                        </div>
                        <div className="weatherInfoBoxes">
                            <h3 className="boxTitle">Humidity</h3>
                            <div className="infoBox">
                            <p className="boxInfo">{town.main.humidity}</p>
                            </div>
                        </div>
                        <div className="weatherInfoBoxes">
                            <h3 className="boxTitle">Wind Speed</h3>
                            <div className="infoBox">
                            <p className="boxInfo">{Math.round(town.wind.speed * 2.23964)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            }      
        {
        error ?
        <h1>404 - Not Found!</h1> :
        <></>
        } 
        {/* <CitiesWeather className='hidden' city={town} hideLink={true}/> */}
        </div>
    )
}