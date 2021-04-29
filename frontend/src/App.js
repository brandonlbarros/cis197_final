import React, {useState, useEffect} from 'react'
import ReactAnime from 'react-animejs'
const {Anime} = ReactAnime
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    browserHistory
  } from "react-router-dom";
import axios from 'axios'
import Account from './Account'
import Feed from './Feed'
import AddArticle from './AddArticle';
import Home from './Home'


const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [username, setUsername] = useState('')
    const [dataLoaded, setDataLoaded] = useState(false)

    return (
        <Router>
            <div>
                <h1 className="textStandard">CIS 197 Final</h1>
                <div>
                    <div className="menuItem textStandard">
                        {dataLoaded ?
                            <Link className="center" to="/">Home</Link>
                            :
                            <div className="center"> Home </div>
                        }
                    </div>
                    <div className="menuItem textStandard">
                        {dataLoaded ?
                            <Link className="center" to="/articles/feed">Articles</Link>
                            :
                            <div className="center"> Articles </div>
                        }
                    </div>
                    {(admin & dataLoaded) ?
                    <div className="menuItem textStandard">
                        <Link className="center" to="/articles/add">Write Article</Link>
                    </div> :
                    <div className="menuItem textStandard">
                        <div className="center"> Write Article </div>
                    </div>
                    }
                    <div className="menuItem textStandard">
                        {dataLoaded ?
                            <Link className="center" to="/account">{loggedIn ? "Logout" : "Login/Sign Up"}</Link>
                            :
                            <div className="center"> Login/Sign Up </div>
                        }
                        
                    </div>
                </div>
                <hr />
                <Switch>
                    <Route exact path="/">
                        <div> 
                            <Home setUsername={setUsername} setLoggedIn={setLoggedIn} setAdmin={setAdmin} setDataLoaded={setDataLoaded} />
                            {dataLoaded ?
                                <div className="textStandard">
                                    <h3>Welcome {username}!</h3>
                                    <div>{loggedIn ? 
                                        (admin ? 
                                            <p>
                                                You're an 
                                                <b> admin user, </b> 
                                                meaning you can write and delete posts!
                                                <br />
                                                Of course, you can still just read, like, and comment on posts.
                                            </p>
                                            : 
                                            <p>
                                                As a 
                                                <b> non-admin user </b> 
                                                you can read, like, and comment on posts.
                                                <br />
                                                If you'd like to get an admin account to write/delete posts, talk to the website owner!
                                            </p>
                                            
                                        ) 
                                        : 
                                        <p>
                                            As a 
                                            <b> guest user </b> 
                                            you can read posts, but can't like or comment.
                                            <br />
                                            You also can't write new articles.
                                            <br />
                                            Sign up for an account to do more!
                                        </p>
                                        }
                                    </div>
                                </div>
                                :
                                <Anime
                                    initial={[
                                        {
                                        targets: "#Box",
                                        opacity: [0,1,0],
                                        easing: "easeInOutQuad",
                                        duration: 2000,
                                        loop: true,
                                        }
                                    ]}
                                    >
                                    <div className='loadingAnimate' id="Box">Loading</div>
                                </Anime>
                            }
                        </div>
                    </Route>
                    <Route path="/articles/feed">
                        <Feed admin={admin} loggedIn={loggedIn} />
                    </Route>
                    <Route path="/articles/add">
                        <AddArticle author={username} />
                    </Route>
                    <Route path="/account">
                        <Account setActive={setLoggedIn} setAdmin={setAdmin} state={loggedIn} setDataLoaded={setDataLoaded}/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App