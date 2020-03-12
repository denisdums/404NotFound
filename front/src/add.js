import React from "react";
import {useCookies, withCookies} from 'react-cookie';
import axios from "axios";


function Add(props) {
        const [cookies, removeCookie] = useCookies(['login']);
        const msg = cookies.login && cookies.login.username ? "connection OK" : "no connection";

        async function newQuizz(e) {
        e.preventDefault();
        let nomQuizz = {name:e.target.quizz_name.value};

        const selectedFile = e.target.quizz_image.files[0];
        const data = new FormData();
        data.append('file', selectedFile, selectedFile.name);
        axios.post('http://localhost:8000/upload', data);
        let p = {
            name: nomQuizz.name,
            nom_fichier: selectedFile.name,
        };

        axios.post('http://localhost:8000/quizzadd', p);

        }


    if (cookies.login && cookies.login.username) {

        return (

            <div id="container">
                <div id="logo"></div>
                <div id="login">
                    <form onSubmit={e=> newQuizz(e)} className="formregister">
                        <div className="txtb">
                            <input type="text" className="" name="quizz_name" placeholder="Quizz Name"/>
                        </div>
                        <div className="txtfile">
                            <input type="file" className="" name="quizz_image" placeholder="Quizz Image"/>
                        </div>



                        <input type="submit" value="Add Quizz" className="btn_submit"/>
                    </form>
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

export default Add;