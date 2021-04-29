import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddArticle from './AddArticle';

const ArticleDetails = ( {post, admin, loggedIn} ) => {
    const [comment, setComment] = useState('')
    
    const addLike = async () => {
        console.log("here")
        const { _id, likes } = post
        console.log(_id)
        const { data, status } = await axios.post('/feed/posts/like', { _id, likes })
        if (status === 200) {
            post = data
            console.log(data)
            console.log("worked")
        } else {
            console.log("did not work")
        }
        console.log("end")
    }

    const addComment = async () => {
        console.log("here")
        const { _id, comments } = post
        console.log(_id)
        const { data, status } = await axios.post('/feed/posts/comment', { _id, comments, comment })
        if (status === 200) {
            post = data
            console.log(data)
            console.log("worked")
        } else {
            console.log("did not work")
        }
        console.log("end")
    }

    const deletePost = async () => {
        const { _id } = post
        console.log(_id)
        const { data, status } = await axios.post('/feed/posts/delete', { _id })
        if (status === 200) {
            post = null
            console.log(data)
            console.log("worked")
        } else {
            console.log("did not work")
        }
        console.log("end")
    }

    return (
        <div>
            {post.title != '' ?
                <div>
                    <h3 className="textStandard">{post.title}</h3>
                    <h5 className="textStandard">Written By: {post.author}</h5>
                    <p className="textStandard">{post.articleText}</p>
                    {loggedIn ?
                        <button onClick={() => {
                            addLike()
                            post.likes++
                            }
                        }>Add Like</button>
                        : 
                        <div className="textLeft"> Log In or Sign Up to like and comment! </div>
                    }
                    <div> Likes: {post.likes} </div>
                    {loggedIn ?
                        <div>
                            <div className="textLeft">
                                Comment:
                            </div>
                            <input onChange={e => setComment(e.target.value)} />
                            <div></div>
                            <button onClick={() => {
                                addComment()
                                post.comments.push(comment)
                                }
                            }>  Comment </button> 
                        </div>
                        :
                        <div />
                    }
                    
                    {post.comments.map(c =>
                        <div key={Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10)}>
                            <hr />
                            <div className="textLeft"> {c} </div>
                            <hr />
                        </div>
                    )}
                    {admin ?
                        <div>
                            <button onClick={() => {
                                deletePost()
                                post.likes = 0
                                post.title = ''
                                }
                            }> Delete Post </button>
                        </div>
                        :
                        <div></div>
                    }
                </div>
                :
                <div>
                    <div className="textStandard">Looks like this article was just deleted!</div>
                    <div className="textStandard">Please return to the feed</div>
                </div>
            }   
        </div>
    )
}

export default ArticleDetails