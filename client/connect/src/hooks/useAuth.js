import { useSelector } from 'react-redux'
import {selectCurrentToken} from "../features/auth/authSlice"
import {jwtDecode} from  'jwt-decode'

 export const useAuth = () => {
    const token = useSelector(selectCurrentToken)
   
    
    if (token) {
        const decoded = jwtDecode(token)
        const  {id, firstname, lastname, email, password, address, bio, work, school, relationship, birthday, profile, Cover} = decoded.UserInfo   

         
        return {id, firstname, lastname, email, password, address, bio, work, school, relationship, birthday, profile, Cover}
    }

    return {id, firstname, lastname, email, password, address, bio, work, school, relationship, birthday, profile, Cover}
}

export default useAuth