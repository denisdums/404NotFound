import React, {useEffect, useState} from "react";
import {useCookies, withCookies} from 'react-cookie';
import axios from "axios";
import UserQuizz from "./UserQuizz";


function User() {
        const [cookies, removeCookie] = useCookies(['login']);
        const [userQuizz,setUserQuizz] = useState([]);
        const msg = cookies.login && cookies.login.username ? "connection OK" : "no connection";

    function disconnect() {
        removeCookie('login');
    }

        async function getUserQuizz() {
            const data = (await axios.get('http://localhost:8000/quizzuser/' + cookies.login.username)).data;
            setUserQuizz(data);
        }

    useEffect(() => {
        if(cookies.login != null){
            getUserQuizz();
        }


    }, []);

    let jsxUserQuizz = userQuizz.map(p=>

            <UserQuizz
                nameQuizz = {p.name}
                author = {p.author}
                picture = {p.picture_url}
            />);

    if (cookies.login && cookies.login.username) {

        return (

            <div id="container">
                <div id="logo"></div>
                <form id="profil">
                    <span id="titre_profil">MY PROFIL</span>
                    <div className="component_profil">
                        <span className="tittle_component">Username</span>
                        <input className="champ_profil" type="text" />
                    </div>
                    <div className="component_profil">
                        <span className="tittle_component">Password</span>
                        <input className="champ_profil" type="password"/>
                    </div>
                    <div className="component_profil"><input type="submit" value="CHANGE" className="btn_change" id="change"/></div>
                </form>
                <div id="profil " id="myquizz">
                    <span id="titre_profil">MY QUIZZ</span>
                    <div id="filters"><div id="disconnect" onClick={disconnect}></div></div>
                    <div id="addquiz"><a id="btnquizz" href="add"></a></div>
                    <div id="container_quizz_user">{jsxUserQuizz}</div>


                </div>

            </div>
        );

    }
    else {
        return (
            <div id="container">
                <div id="logo_notlogged"></div>
                <div id="buttons_list">
                    <div><a href="login">Login</a></div>
                    <div><a href="register">Register</a></div>
                </div>
            </div>
        );
    }
}

export default User;