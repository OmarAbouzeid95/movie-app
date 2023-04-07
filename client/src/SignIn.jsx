import {React, useState} from 'react'

export default function SignIn(props){
    
    const [userInfo, setUserInfo] = useState({email: '', password: ''})
    const [signInStatus, setSignInStatus] = useState('')

    // eslint-disable-next-line no-unused-vars
    function signIn(){
        /**
         * POST request to make the password not visible in the URL 
         * check the server to see if this user exists
         */
        fetch('https://movieapp-rget.onrender.com/signIn', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data) {
                setSignInStatus('failed')
            } else {
                // signed in successfully
                props.updateUserData(data)
                setTimeout(() => {
                    props.updateCurrentPage('homepage')
                }, 2000)
                setSignInStatus('success')
            }
        })
    }

    return (
        <div className="form-box">
        <form className="form">
            <span className="subtitle">Sign in with your email.</span>
            {((signInStatus !== '') && (signInStatus !== 'success')) && <p className="signIn-failed">Email or password are incorrect.</p>}
            {(signInStatus === 'success') && <p className="signIn-successful">Successfully Signed in!</p>}
            <div className="form-container">
                    <input type="email" className="input" required placeholder="Email" onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}></input>
                    <input type="password" className="input" required placeholder="Password" onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}></input>
            </div>
            <button onClick={(e) => {
                e.preventDefault()
                signIn()
                }}>Sign in</button>
        </form>
        <div className="form-section">
            <p>Don't have an account? <span className="signUp-btn" onClick={() => props.updateCurrentPage("signUp")}>Sign up</span></p>
        </div>
        
    </div>
    )
}