import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import Comment from "./Comment"
import { Link, useNavigate } from "react-router-dom"

function Post({ post, contact }) {
    const { user } = useContext(AppContext)
    const [comments, setComments] = useState([])
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
        navigate(`/user/${id}`)
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
                    <h2>{contact.firstName} {contact.lastName}</h2>
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
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment}/>
                ))}
            </div>
            <div className="PostAddComment">
                <button className="UserIcon-Home" 
                style={{ backgroundColor: user.favouriteColour }}
                onClick={() => handleButtonClick(user.id)}>{user.firstName ? user.firstName[0] : ''}{user.firstName ? user.lastName[0] : ''}</button>
                <textarea name="content" value={comment.content} onChange={handleTextChange}>
                </textarea>
                <button className="UserPostCommentButton" onClick={handlePostComment}>{'>'}</button>
            </div>
        </div>
        </>
    )
}

export default Post