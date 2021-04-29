import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ReactAnime from 'react-animejs'
const {Anime} = ReactAnime
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddArticle from './AddArticle';
import ArticleDetials from './ArticleDetails';

const Feed = ( {admin, loggedIn} ) => {
    const [posts, setPosts] = useState([])
    const [selectedPost, setSelectedPost] = useState({})
    const [articlesLoaded, setArticlesLoaded] = useState(false)

    useEffect(() => {
        const intervalID = setInterval(() => {
            (async () => {
                const { status, data } = await axios.get('/feed/posts', {})
                if (status === 200) {
                    setPosts(data)
                    console.log("GIGI")
                    setArticlesLoaded(true)
                } else {
                    console.log("Error")
                }
            })();
        }, 2000)
        return () => clearInterval(intervalID)
    }, [posts])

    return (
        <Router>
            <Switch>
                <Route path="/articles/feed">
                    <div> 
                        {articlesLoaded ?
                            <div />
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
                                <div className='loadingAnimate' id="Box">Loading Articles...</div>
                            </Anime>
                        }
                        <hr/>
                        {posts.map(post =>
                            <div key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)}>
                                <Link to="/articles/details">
                                    <button onClick={() => setSelectedPost(post)}>
                                        <div>{post.title}</div>
                                        <div>{post.articleText}</div>
                                        <div>{post.author}</div>
                                    </button>
                                    <hr/>
                                </Link>
                            </div>
                        )}
                    </div>
                </Route>
                <Route path="/articles/details">
                    <Link to="/articles/feed">Back to feed</Link>
                    <ArticleDetials post={selectedPost} admin={admin} loggedIn={loggedIn}/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Feed