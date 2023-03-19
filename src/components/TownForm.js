import { useState, useContext } from "react"
import { DataContext } from "../contexts/DataProvider"

export default function TownForm(){

    const [town, setTown] = useState("")
    const { addTown } = useContext(DataContext)



    async function handleSubmit(e){

        e.preventDefault()
        const newTown = await addTown(town)
        setTown("")
        
    }

    return(
        <form className="searchBox" onSubmit={handleSubmit}>
            <div>
            <input 
                className="inputCity"
                placeholder="      Enter City"
                type="text" 
                name="town" 
                id="town"
                onChange={(e) => setTown(e.target.value)}
                value={town} 
            />
            </div>
            <button className="addCityBtn" >Add Location</button>
        </form>
    )
}