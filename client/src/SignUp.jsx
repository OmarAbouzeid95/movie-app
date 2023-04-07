import {React, useState} from 'react'

export default function SignUp(props){
    
    const [userInfo, setUserInfo] = useState({firstName: '', lastName: '', email: '', password: '', repassword: ''})
    const [signUpStatus, setSignUpStatus] = useState('')

    function signUp(){
        /**
         * some validations for the signup
         */
        const isAlpha = str => /^[a-zA-Z]*$/.test(str);
        const isPassword = str => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(str)
        if (!isAlpha(userInfo.firstName) || userInfo.firstName.trim(' ') === ''){
            setSignUpStatus('Enter a valid First name')
        }else if(!isAlpha(userInfo.lastName) || userInfo.lastName.trim(' ') === ''){
            setSignUpStatus('Enter a valid last name')  
        }else if(userInfo.email.indexOf('@') === -1 || userInfo.email.indexOf('.') === -1){
            setSignUpStatus('Enter a valid email address')
        }
        else if(!isPassword(userInfo.password)){
            setSignUpStatus(<span className="pw-rules">Password needs to match these rules: <br></br>
                           - Minimum eight characters <br></br>
                           - At least one uppercase letter <br></br>
                           - At least one lowercase letter <br></br>
                           - One number <br></br>
                           - One special character</span>)             
        }else if(userInfo.password !== userInfo.repassword){
            setSignUpStatus("Passwords don't match")
        }else {
            /**
             * Check if email already exists in the DB
             */
            fetch(`https://movieapp-rget.onrender.com/user/${userInfo.email}`)
            .then(res => res.json())
            .then(data => {
                if (data === null){
                    /**
                     * Create new user by POST request
                     */
                    fetch('https://movieapp-rget.onrender.com/signUp', {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(userInfo)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.result === "success"){
                            setTimeout(() => {
                                props.updateCurrentPage('signIn')
                            }, 2000)
                            setSignUpStatus('success')
                        }else {
                            setSignUpStatus('Failed to sign up.')
                        }
                    })
                }
                else {
                    setSignUpStatus('This email is already in use.')
                }
            })
            
        }
    }

    return (
        <div className="form-box">
                <form className="form">
                    <span className="subtitle">Create a free account with your email.</span>
                    {((signUpStatus !== '') && (signUpStatus !== 'success')) && <p className="signUp-failed">{signUpStatus}</p>}
                    {(signUpStatus === 'success') && <p className="signUp-successful">Successfully Signed up!</p>}
                    <div className="form-container">
                            <input type="text" className="input" required placeholder="First Name" onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}></input>
                            <input type="text" className="input" required placeholder="Last Name" onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}></input>
                            <input type="email" className="input" required placeholder="Email" onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}></input>
                            <input type="password" className="input" required placeholder="Password" onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}></input>
                            <input type="password" className="input" required placeholder="Re-enter Password" onChange={(e) => setUserInfo({...userInfo, repassword: e.target.value})}></input>
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault()
                        signUp()
                        }}>Sign up</button>
                </form>
                <div className="form-section">
                    <p>Have an account? <span className="signIn-btn" onClick={() => props.updateCurrentPage("signIn")}>Sign in</span></p>
                </div>
                
            </div> 
            )
        }
            
    
