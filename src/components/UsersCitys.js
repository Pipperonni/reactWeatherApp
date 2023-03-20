import { AuthContext } from "./AuthProvider"
import { DataContext } from "../contexts/DataProvider"


const [citys, setCitys] = useState([])
const { userId } = useContext(AuthContext)
const { towns } = useContext(DataContext)

function getCitys(){
    const usersCities = []
    for ( let i =0; i<towns.length-1; i++){
        console.log(i)
        if (towns[i].uid == userId){
            usersCities.push(towns[i])
            console.log(towns[i].uid)
        }
    }
    
    return setCitys(usersCities)
}
console.log(citys)