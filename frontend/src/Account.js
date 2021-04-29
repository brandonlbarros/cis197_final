import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    browserHistory
  } from "react-router-dom";
import '../style/style.css'

const Account = ({ setActive, setAdmin, state, setDataLoaded }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [adminPass, setAdminPass] = useState('')
    const [signUpView, setSignUpView] = useState(false)
    const history = useHistory()

    const login = async () => {
        const { status, data } = await axios.post('/account/login', { username, password })
        if (status === 200) {
            console.log(data)
            history.push("/")
            setActive(true)
            setAdmin(data.admin)
            setDataLoaded(false)
        } else {
            window.alert("Incorrect login")
            console.log("messed")
        }
    }

    const signUp = async () => {
        const admin = adminPass.trim() == 'adminpass'

        const { status, data } = await axios.post('/account/signup', { username, password, admin })
        if (status === 200) {
            console.log("OK")
            history.push("/")
            setActive(true)
            setAdmin(data.admin)
            setDataLoaded(false)
        } else {
            window.alert("Incorrect login")
            console.log("messed")
        }
    }

    const logout = async () => {
        const { status } = await axios.post('/account/logout', {})
        if (status === 200) {
            setActive(false)
            setAdmin(false)
            setDataLoaded(false)
            console.log("OK")
            history.push("/")
        } else {
            console.log("messed")
        }
    }

    return (
        <div>
            {!state ?
            (signUpView ? <div className="centerPage">
                <h3 className="textStandard">Sign Up</h3>
                <div className="centerPage">
                    <button className="textStandard" onClick={() => setSignUpView(false)}>  Go to Log In </button>
                </div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="textLeft">
                    Username:
                </div>
                <input className="textLeft" onChange={e => setUsername(e.target.value)} />
                <div className="spacerMini"></div>
                <div className="textLeft">
                    Password:
                </div>
                <input className="textLeft" onChange={e => setPassword(e.target.value)} />
                <div className="spacerMini"></div>
                <div className="textLeft">
                    Admin Access Password:*
                </div>
                <input className="textLeft" onChange={e => setAdminPass(e.target.value)} />
                <div className="spacer"></div>
                <button className="textStandard" onClick={() => signUp(username, password)}>  Sign Up </button> 
                <div className="spacer"></div>
                <div>*Admin access allows you to take on the role of an admin, 
                    which allows you to add and delete posts. If you would like
                    to be an admin, please enter the admin password (must talk to 
                    site owner to get password)
                </div>
            </div> :
            <div className="centerPage">
                <h3 className="textStandard">Log In</h3>
                <div className="centerPage">
                    <button onClick={() => setSignUpView(true)}>  Go to Sign Up </button>
                </div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="textLeft">
                    Username:
                </div>
                <input className="textLeft" onChange={e => setUsername(e.target.value)} />
                <div className="spacerMini"></div>
                <div className="textLeft">
                    Password:
                </div>
                <input className="textLeft" onChange={e => setPassword(e.target.value)} />
                <div className="spacer"></div>
                <button className="textStandard" onClick={() => login(username, password)}> Login </button>
            </div>
            ) 
            :
            <div>
                <button className="textStandard" onClick={() => logout()}>  Log Out </button>
            </div>}
        </div>
    )
}

export default Account