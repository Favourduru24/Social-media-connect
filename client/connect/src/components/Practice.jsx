 import {useGetUsersQuery} from "../features/user/usersApiSlice"
import User from './User'

const Practice = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange:true
    })




    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <div className="flex flex-col">
                <User key={userId} userId={userId} />
                </div>
                )
            : <p>No User Yet...</p>

        content = (
             <h1>{ tableContent}</h1>
        )
    }

    return content
}
export default Practice