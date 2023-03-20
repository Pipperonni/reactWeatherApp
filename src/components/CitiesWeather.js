import { Link } from 'react-router-dom'


export default function CitiesWeather(props){

    return(
        <div className="city">
            <h3 className='cityName'>{props.city.town}</h3>

            {
                (props.hideLink) ?
                <></> :
                <div className='getWeatherBox'>
                <Link className='getWeather' to={ `/post/${props.city.uid}/${props.city.id}` }>Get Weather</Link>
                </div>
            }
        </div>
    )
}