import React, {useEffect, useState} from "react";
import axios from "axios";
import AffichageQuestion from "./AffichageQuestion";
import {HTTP_SERVER_PORT_PICTURES} from "./constants";
import {useCookies} from "react-cookie";




export default function QuizzQuestion(props) {

    let id = props.match.params.id;
    const [cookies, removeCookie] = useCookies(['login']);
    let username = cookies.login && cookies.login.username ? cookies.login.username : null;

    const [question, setQuestions] = useState([]);
    const [user, setUser] = useState([]);
    const [current, setCurrent] = useState(0);

    async function getQuestions(){
        const data = (await axios.get('http://localhost:8000/quizz/jouer/' + id )).data;
        setQuestions(data);

    }

    async function getUser() {
        if (username != null){
            const dataUser = (await axios.get('http://localhost:8000/user/' + username )).data;
            setUser(dataUser);
        }

    }
    async function insertScore(sc) {

        (await axios.patch('http://localhost:8000/scoreAdd/' + username+"/"+sc));
    }

    const [scoreQuizz, setScoreQuizz]= useState(0);
    const [nbPointstoAdd, setPointtoAdd]=useState(10);

    function calculeScoreEtQuestionSuivante(etat) {
        if (etat){
            setScoreQuizz(scoreQuizz + nbPointstoAdd);
            setPointtoAdd(nbPointstoAdd + 10);
            console.log('pointProchainequestion',nbPointstoAdd);
            console.log('score', scoreQuizz);
        }
        else{
            setPointtoAdd( 10);
            console.log('pointProchainequestion',nbPointstoAdd);
            console.log('score', scoreQuizz);
        }

        nextQuestion();
    }
    function nextQuestion(){
        setCurrent(current+1);
    }
    useEffect(() => {
        getQuestions();
        getUser();
    }, []);

    if(question.length == 0)
        return (
            <div>En cours de chargement</div>
        );
    if(current >= question.length)
        if(scoreQuizz > 0){
            if (username != null){
                console.log('ajoutPoint');
                insertScore(scoreQuizz);
            }
            return (
                <div>
                    <div id="logo"></div>
                    <div className="containerFinQuizz">
                        <div><h1>Bravo {username != null ? username : null} !</h1><h2 id="titre_profil"> Votre score est de {scoreQuizz} points</h2></div>
                        <a href="/" className="btnLancementQuizz">Retour à l'accueil</a>
                    </div>
                </div>
            );
        }
    else{
            return (
                <div>
                    <div id="logo"></div>
                    <div className="containerFinQuizz">
                        <div><h1>Dommage !</h1><h2 id="titre_profil"> Votre score est de {scoreQuizz} point</h2></div>
                    <a href="/" className="btnLancementQuizz">Retour à l'accueil</a>
                    </div>
                </div>
            );
        }



    let jsxQuestions =
        <AffichageQuestion
            id = {question[current].id}
            sentence = {question[current].sentence}
            video_url = {question[current].video_url}
            calculeScoreEtQuestionSuivante = {calculeScoreEtQuestionSuivante}
            current = {current}
            score = {scoreQuizz}
        />;



    return (
        <div className="coucou">
            <div id="logo"></div>
            {jsxQuestions}
        </div>
    )
}