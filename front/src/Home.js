import React, {useEffect, useState} from "react";
import QuizzThumbnail from "./QuizzThumbnail";
import axios from "axios";
import {HTTP_SERVER_PORT_PICTURES} from "./constants";
import Modal from "./Modal";

function Home() {
    const [quizzes, setQuizzes] = useState([]);
    const [displayModal, setDisplayModal] = useState(false);




    async function getQuizzes(){
        const data = (await axios.get('http://localhost:8000/' + 'quizz')).data;
        setQuizzes(data);
    }
    useEffect(() => {
        getQuizzes();

    }, []);

    async function filterQuizz(e){

        e.preventDefault();
        changeDisplayModal(e);
        let filtreRecup = e.target.filter.value;

        const data = (await axios.get('http://localhost:8000/recherche/' + filtreRecup)).data;

        if (data.length != 0){

            setQuizzes(data);
        }else{
            getQuizzes();
        }







    }

    if(quizzes.length==0){
        return (
            <div>Load data</div>
        );

    }
    let q=quizzes[0];



    function changeDisplayModal(e) {
        const div = document.querySelector('.modal');

        e.preventDefault();
        if(displayModal){
            setDisplayModal(false);
            div.classList.toggle("active");
        }
        else{
            setDisplayModal(true);
            div.classList.toggle("active");
        }


    }
    return (
        <div id="container">
            <div id="logo"></div>
            <div id="filters" onClick={e => changeDisplayModal(e)}><div id="btn_filters"></div></div>
            <div id="container_quizz">
                <div id="first_quizz">
                    <a className="lien_quizz" href={'quizz/'+ q.id}>
                        <img className="image_quizz" src={HTTP_SERVER_PORT_PICTURES + q.picture_url} alt="icon"/>
                        <span className="titre_quizz">{q.name}</span>
                    </a>
                </div>
                {quizzes.filter( (q,i) => i !== 0).map(p =>
                    <QuizzThumbnail
                        name = {p.name}
                        icon = {p.picture_url}
                        id = {p.id}
                    />)}
            </div>

            <Modal filterQuizz={filterQuizz} changeDisplayModal={changeDisplayModal}/>
        </div>

    );


}
export default Home;