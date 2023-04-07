import {useState} from 'react'

export default function Profile(props){


    const [editing, setEditing] = useState(false)
    const [updatedInfo, setUpdatedInfo] = 
    useState({
            firstName: props.userData.firstName, 
            lastName: props.userData.lastName, 
            email: props.userData.email, 
            password: props.userData.password
            })
    const [updateStatus, setUpdateStatus] = useState('')

    function updateUserInfo(){
        /**
         * Patch request to the server to update user info
         */
        const data = {...updatedInfo, oldEmail: props.userData.email}
        console.log(data)
        fetch("https://movieapp-rget.onrender.com/updateUser", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.result === "success"){
                setUpdateStatus('success')
                setEditing(false)
                props.updateUserData(updatedInfo)
            }else {
                setUpdateStatus('Failed to update')
            }
        })
    }


    function validate(){

        /**
        * some validations for the signup
        */
        const isAlpha = str => /^[a-zA-Z]*$/.test(str)
        const isPassword = str => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(str)
        if (!isAlpha(updatedInfo.firstName) || updatedInfo.firstName.trim(' ') === ''){
            setUpdateStatus('Enter a valid First name.')
        }else if(!isAlpha(updatedInfo.lastName) || updatedInfo.lastName.trim(' ') === ''){
            setUpdateStatus('Enter a valid last name.')
        }else if(updatedInfo.email.indexOf('@') === -1 || updatedInfo.email.indexOf('.') === -1){
            setUpdateStatus('Enter a valid email address.')
        }
        else if(!isPassword(updatedInfo.password)){
            setUpdateStatus(<span className="pw-rules">Password needs to match these rules: <br></br>
                                                        - Minimum eight characters <br></br>
                                                        - At least one uppercase letter <br></br>
                                                        - At least one lowercase letter <br></br>
                                                        - One number <br></br>
                                                        - One special character</span>)
        }
        // check if email has changed 
        else if(props.userData.email !== updatedInfo.email){
            /**
             * Check if email already exists in the DB
             */
            fetch(`https://movieapp-rget.onrender.com/user/${updatedInfo.email}`)
            .then(res => res.json())
            .then(data => {
                if (data !== null){
                    setUpdateStatus('This email is already in use.')
                }else {
                    updateUserInfo()
                }   
                })
        }else {
            updateUserInfo()
        }
    }


    return (
        <div className="form-box">
                <form className="form">
                    <span className="subtitle">Account details.</span>
                    {((updateStatus !== '') && (updateStatus !== 'success')) && <p className="update-failed">{updateStatus}</p>}
                    {(updateStatus === 'success') && <p className="update-successful">Successfully Updated!</p>}
                    <div className="form-container">
                        <fieldset disabled={!editing}>
                            <input type="text" className="input"  placeholder="First Name" value={updatedInfo.firstName} onChange={(e) => setUpdatedInfo({...updatedInfo, firstName: e.target.value})}></input>
                            <input type="text" className="input"  placeholder="Last Name"  value={updatedInfo.lastName} onChange={(e) => setUpdatedInfo({...updatedInfo, lastName: e.target.value})}></input>
                            <input type="email" className="input"  placeholder="Email"  value={updatedInfo.email} onChange={(e) => setUpdatedInfo({...updatedInfo, email: e.target.value})}></input>
                            <input type="password" className="input"  placeholder="Password" value={updatedInfo.password} onChange={(e) => setUpdatedInfo({...updatedInfo, password: e.target.value})}></input>
                        </fieldset>
                    </div>
                    <button onClick={() => {
                        props.updateUserData(null)
                        props.updateCurrentPage('signIn')
                        }}>Sign out</button>
                    {!editing && <button onClick={() => setEditing(true)}>Edit profile</button>}
                    {editing && <button onClick={(e) =>{ 
                        e.preventDefault()
                        validate()
                    }}>Save changes</button>} 
                </form>                
            </div>
    )
}