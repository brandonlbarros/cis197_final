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

const AddArticle = ( {author} ) => {
    const [title, setTitle] = useState('')
    const [articleText, setArticleText] = useState('')
    const [justSubmitted, setJustSubmitted] = useState(false)
    const history = useHistory()

    const addPost = async () => {
        const { status } = await axios.post('/feed/posts/add', {title, articleText, author})
        if (status === 200) {
            setTitle('')
            setArticleText('')
            setJustSubmitted(true)
            history.push("/")
        } else {
            console.log("messed")
        }
    }

    return (
        <div>
            <div>
                <h3>Write an Article {author}</h3>
                {justSubmitted ?
                    <div> Article Succesfully Submitted! </div>
                :
                    <div/>
                }
                <div>
                    Article Title:
                </div>
                <input onChange={e => setTitle(e.target.value)} />
                <div>
                    Body:
                </div>
                <textarea className="articleBody" onChange={e => setArticleText(e.target.value)} />
                <div></div>
                <button onClick={() => addPost()}>  Add Post </button>
                <div>Current Title: {title}</div>
                <div>Current Body: {articleText}</div>
            </div> 
        </div>
    )
}

export default AddArticle