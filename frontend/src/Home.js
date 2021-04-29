import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AddArticle from './AddArticle';
import ArticleDetials from './ArticleDetails';

const Home = ({setUsername, setLoggedIn, setAdmin, setDataLoaded}) => {

    useEffect(() => {
        const intervalID = setInterval(() => {
            (async () => {
                const { status, data } = await axios.get('/account/check', {})
                if (status === 200) {
                    if (data.username) {
                        setUsername(data.username)
                        setLoggedIn(true)
                        setAdmin(data.admin)
                        setDataLoaded(true)
                    } else {
                        setUsername("Guest")
                        setLoggedIn(false)
                        setAdmin(false)
                        setDataLoaded(true)
                    }
                } else {
                    console.log("Error")
                }
            })();
        }, 2000)
        return () => clearInterval(intervalID)
    }, [])

    return (
        <div>
        </div>

    )
}

export default Home