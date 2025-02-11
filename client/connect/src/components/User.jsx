 import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUsersById} from '../features/user/usersApiSlice'
import img1 from '/images/blank.png'


const User = ({ userId }) => {
    const user = useSelector(state => selectUsersById(state, userId))


    const navigate = useNavigate()

    if (user) {

        return (

        <div className='flex-col flex gap-10 '> 
        
        <div className='flex gap-2 items-center py-2'>
        <Link to={`/user/${user.id}`}>
              <div className='w-10 h-10 rounded-full'>
              <img src={user.profile ?`http://localhost:4000/images/`+ user.profile : img1} className='w-full h-full rounded-full object-cover'/>
              </div>
              </Link>
        <Link to={`/user/${user.id}`}>  
            <p className='text-black cursor-pointer font-zentry-regular font-semibold dark:text-white'>{user.firstname} {user.lastname}</p>
           </Link>
        </div>
        </div>
            
            
             
        )

    } else return <p className='text-black'>Unavailable..</p>
}
export default User