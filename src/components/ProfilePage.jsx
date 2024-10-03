import { useContext, useState } from "react"
import { AppContext } from "../App"

function ProfilePage({ onAction }) {
    const { user, setUser } = useContext(AppContext)
    const [formKey, setFormKey] = useState(Date.now())


    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`https://boolean-uk-api-server.fly.dev/Yumikitsu/contact/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if (response.ok) {
                onAction()
                setFormKey(Date.now())
            } else {
                console.error("Failed to update Contact")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    // Handle a freetext change event
    const handleTextChange = (event) => {
        setUser({...user, [event.target.name]:event.target.value})
    }

    return (
        <>
        <div className="ProfileTop">
            <h2 className="ProfileText">Profile</h2>
        </div>
        <div className="ProfileBottom">
            <div className="ProfileSurvey">
                <div className="ProfileUser">
                    <button className="UserIcon-Profile" style={{ backgroundColor: user.favouriteColour }}>{user.firstName ? user.firstName[0] : ''}{user.firstName ? user.lastName[0] : ''}</button>
                    <h2 className="ProfileName">{user.firstName} {user.lastName}</h2>
                </div>
                <section className="FormSection">
                    <form key={formKey} className="Form" onSubmit={handleSubmit}>
                        <div className="FormContent">
                            <div className="AccountInfo">
                                <h2>Account Info</h2>
                                <label>First Name*
                                    <input type="text" name="firstName" value={user.firstName} onChange={handleTextChange} required/>
                                </label>
                                <label>Last Name*
                                    <input type="text" name="lastName" value={user.lastName} onChange={handleTextChange} required/>
                                </label>
                                <label>Gender*
                                    <input type="text" name="gender" value={user.gender} onChange={handleTextChange} required/>
                                </label>
                                <label>Email*
                                    <input type="text" name="email" value={user.email} onChange={handleTextChange} required/>
                                </label>
                            </div>
                            <div className="Address">
                                <h2>Address</h2>
                                <label>Street
                                    <input type="text" name="street" value={user.street} onChange={handleTextChange}/>
                                </label>
                                <label>City
                                    <input type="text" name="city" value={user.city} onChange={handleTextChange}/>
                                </label>
                            </div>
                        </div>
                        <div className="SubmitButton">
                            <input className="SubmitForm" type="submit" value={"Save"} />
                        </div>
                    </form>
                </section>
            </div>
        </div>
        </>
    )
}

export default ProfilePage