// import { useSelector } from 'react-redux'
// import { selectCommentById } from '../features/comment/commentsApiSlice'
// import { useGetCommentQuery } from '../features/comment/commentsApiSlice'

const CommentList = ({comment}) => {
     
  //  const {data: comments, isLoading, error} = useGetCommentQuery(postId)

  // const comments = useSelector(state => selectCommentById(state, postId))
  

  //  console.log({comment})
    
  return (
         <div className="text-red-600">{comment?.text}</div>
  )
}

export default CommentList