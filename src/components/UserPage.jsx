import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { Link, useParams } from "react-router-dom"
import Post from "./Post"

function UserPage() {
    const { contacts, posts } = useContext(AppContext)
    const { id } = useParams()
    const [userPosts, setUserPosts] = useState([])

    // Set the userPosts to the posts with the correct user ID
    useEffect(() => {
        const userId = parseInt(id)
        setUserPosts(posts.filter(post => post.contactId === userId))
    }, [id, posts] )

    if (userPosts.length === 0) {
        return <Link to='/'><div className="UserNoPosts">User Hasn't Posted Anything</div></Link>
    }

    return (
        <>
        <div className="Posts">
            {userPosts.map(post => (
                <Post key={post.id} post={post} contact={contacts.find(contact => contact.id === post.contactId)} />
            ))}
        </div>
        </>
    )
}

export default UserPage