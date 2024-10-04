import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import Comment from "./Comment"
import { Link, useNavigate } from "react-router-dom"

function Post({ post, contact }) {
    const { user } = useContext(AppContext)
    const [comments, setComments] = useState([])
    const [expand, setExpand] = useState(false)
    const navigate = useNavigate()

    const initialCommentData = {
        postId: post.id,
        content: '',
        contactId: user.id
    }

    const [comment, setComment] = useState(initialCommentData)

    useEffect(() => {
        fetch(`https://boolean-uk-api-server.fly.dev/Yumikitsu/post/${post.id}/comment`)
        .then(response => response.json())
        .then(data => setComments(data))
        
        setExpand(false)
    }, [])

    const updateComments = () => {
        fetch(`https://boolean-uk-api-server.fly.dev/Yumikitsu/post/${post.id}/comment`)
        .then(response => response.json())
        .then(data => setComments(data))
    }

    const handlePostComment = async () => {
        try {
            const response = await fetch(`https://boolean-uk-api-server.fly.dev/Yumikitsu/post/${post.id}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })

            if (response.ok) {
                updateComments()
                setComment(initialCommentData)
            } else {
                console.error("Failed to post a Comment")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    // Handle a freetext change event
    const handleTextChange = (event) => {
        setComment({...comment, [event.target.name]:event.target.value})
    }

    const handleButtonClick = (id) => {
        navigate(`/profile/${id}`)
    }

    const handleExpand = () => {
        setExpand(true)
    }

    return (
        <>
        <div className="PostContent">
            <div className="PosterAndTitle">
                <div className="PosterIcon">
                    <button className="UserIcon-Home" 
                    style={{ backgroundColor: contact.favouriteColour }}
                    onClick={() => handleButtonClick(contact.id)}>{contact.firstName ? contact.firstName[0] : ''}{contact.firstName ? contact.lastName[0] : ''}</button>
                </div>
                <div className="PosterNameAndTitle">
                    <Link className="LinkNoUnderline" to={`/profile/${contact.id}`}>
                        <h2>{contact.firstName} {contact.lastName}</h2>
                    </Link>
                    <div className="PosterTitle">
                        <Link className="SideBarLink" to={`/post/${post.id}`}>
                            <p>{post.title}</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="PostText">
                <p>{post.content}</p>
            </div>
            <div className="PostComments">
                {!expand && comments.length > 3 ? (
                    <>
                    <button className="ExpandComments"
                    onClick={() => handleExpand()}>See previous comments</button>
                    {comments.slice(-3).map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))}
                    </>
                ) : (
                    comments.map((comment, index) => (
                        <Comment key={index} comment={comment}/>
                    ))
                )}
            </div>
            <div className="PostAddComment">
                <button className="UserIcon-Home" 
                style={{ backgroundColor: user.favouriteColour }}
                onClick={() => handleButtonClick(user.id)}>{user.firstName ? user.firstName[0] : ''}{user.firstName ? user.lastName[0] : ''}</button>
                <textarea name="content" 
                value={comment.content} 
                onChange={handleTextChange}
                placeholder="Add a comment...">
                </textarea>
                <button className="UserPostCommentButton" onClick={handlePostComment}>{'>'}</button>
            </div>
        </div>
        </>
    )
}

export default Post