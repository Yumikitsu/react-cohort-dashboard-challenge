import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import { useNavigate } from "react-router-dom"

function Comment({ comment }) {
    const { contacts } = useContext(AppContext)
    const [contact, setContactId] = useState(null)
    const navigate = useNavigate()

    // Set the contact to the contact that makes the comment
    useEffect(() => {
        setContactId(contacts.find(contact => contact.id === comment.contactId))
    }, [])

    if(!contact) {
        return <div>Loading...</div>
    }

    const handleButtonClick = (id) => {
        navigate(`/user/${id}`)
    }

    return (
        <>
        <div className="Comment">
            <div className="CommenterIcon">
                <button className="UserIcon-Home" 
                style={{ backgroundColor: contact.favouriteColour }}
                onClick={() => handleButtonClick(contact.id)}>{contact.firstName ? contact.firstName[0] : ''}{contact.firstName ? contact.lastName[0] : ''}</button>
            </div>
            <div className="CommentText">
                <h4>{contact.firstName} {contact.lastName}</h4>
                <p>{comment.content}</p>
            </div>
        </div>
        </>
    )
}

export default Comment