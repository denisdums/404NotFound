import React, {useEffect, useState} from "react";
import axios from "axios";
import AffichageQuestion from "./AffichageQuestion";
import {HTTP_SERVER_PORT_PICTURES} from "./constants";




export default function QuizzQuestion(props) {

    let id = props.match.params.id;

    const [question, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);

    async function getQuestions(){
        const data = (await axios.get('http://localhost:8000/quizz/jouer/' + id )).data;
        setQuestions(data);

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
    }, []);

    if(question.length == 0)
        return (
            <div>En cours de chargement</div>
        );
    if(current >= question.length)
        if(scoreQuizz > 0){
            return (
                <div>
                    <div id="logo"></div>
                    <div className="containerFinQuizz">
                        <div><h1>Bravo !</h1><h2 id="titre_profil"> Votre score est de {scoreQuizz} points</h2></div>
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