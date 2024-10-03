import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import Post from "./Post"

function HomePage() {
    const { user, contacts } = useContext(AppContext)
    const [posts, setPosts] = useState([])
    const initialPostData = {
        title: 'New Post',
        content: '',
        contactId: user.id
    }

    const [postText, setPostText] = useState(initialPostData)

    useEffect(() => {
        fetch("https://boolean-uk-api-server.fly.dev/Yumikitsu/post")
        .then(response => response.json())
        .then(data => setPosts(data))
    }, [])

    const updatePosts = () => {
        fetch("https://boolean-uk-api-server.fly.dev/Yumikitsu/post")
        .then(response => response.json())
        .then(data => setPosts(data))
    }

    const handlePost = async () => {
        try {
            const response = await fetch(`https://boolean-uk-api-server.fly.dev/Yumikitsu/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postText)
            })

            if (response.ok) {
                updatePosts()
                setPostText(initialPostData)
            } else {
                console.error("Failed to post a Post")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    // Handle a freetext change event
    const handleTextChange = (event) => {
        setPostText({...postText, [event.target.name]:event.target.value})
    }

    return (
        <>
        <div className="HomePageContent">
            <div className="UserPost">
                <button className="UserIcon-Home" style={{ backgroundColor: user.favouriteColour }}>{user.firstName ? user.firstName[0] : ''}{user.firstName ? user.lastName[0] : ''}</button>
                <textarea name="content" value={postText.content} onChange={handleTextChange}/>
                <button className="UserPostButton" onClick={handlePost}>Post</button>
            </div>
        </div>
        <div className="Posts">
            {posts.slice().reverse().map(post => (
                <Post key={post.id} post={post} contact={contacts.find(contact => contact.id === post.contactId)} />
            ))}
        </div>
        </>
    )
}

export default HomePage