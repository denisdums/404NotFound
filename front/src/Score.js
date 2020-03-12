import React, {useEffect, useState} from "react";
import {useCookies, withCookies} from 'react-cookie';
import axios from "axios";
import ScoreList from "./ScoreList";

function Score() {
    const [cookies, removeCookie] = useCookies(['login']);
    const msg = cookies.login && cookies.login.username ? "connection OK" : "no connection";
    let username = cookies.login && cookies.login.username ? cookies.login.username : null;

    const [user, setUser] = useState([]);
    const [allUser, setAllUser] = useState([]);



    async function getUser(){
        const data = (await axios.get('http://localhost:8000/user/' + username )).data;
        setUser(data);
    }

    async function getAllUser(){
        const data = (await axios.get('http://localhost:8000/user/')).data;
        setAllUser(data);
    }
    useEffect(() => {
        if(username!= null)
            getUser();
            getAllUser();
    }, []);

    if(allUser.length == 0)
        return (
            <div>En cours de chargement</div>
        );

    if(username != null && user.length == 0 )
        return (<div>Chargement</div>);

    let userScore = null;
    if(username != null)
        userScore =  <div id="score_local">
        <div>{user[0].username}</div>
        <div>{user[0].score} pts</div>

    </div>;

    let jsxScore = allUser.map((p,i) =>
        <ScoreList name = {p.username} score={p.score} classement={i} />);


    return (
        <div id="container">
            <div id="logo"></div>
            <div id="score_list">
                {jsxScore}
            </div>
            {userScore}
        </div>
    );
}

export default Score;