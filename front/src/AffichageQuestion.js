import React, {useEffect, useState} from "react";
import axios from "axios";
import AffichageReponse from "./AffichageReponses";
import Question from "./Questions";
import QuestionVideo from "./QuestionsVideo";



export default function AffichageQuestion(props) {
    let id=props.id;
    const [reponses, setReponses] = useState([]);
    const [mesReponses, setMesReponses] = useState([]);

    async function getReponses(){
        const data = (await axios.get('http://localhost:8000/quizz/reponse/' + id )).data;
        setReponses(data);

    }

    useEffect(() => {
        getReponses();
        setMesReponses([]);
    }, [id]);

    function selectResponse(idR) {
        if (mesReponses.indexOf(idR) != -1){
            let tab = mesReponses.filter(e => e != idR);
            setMesReponses(tab);

        }
        else{

            setMesReponses([...mesReponses,idR]);


        }


    }


    let jsxReponses = reponses.map(p =>
        <AffichageReponse
            id = {p.id}
            sentence = {p.sentence}
            picture_url = {p.picture_url}
            solution = {p.solution}
            checked = {mesReponses.indexOf(p.id) != -1}
            selectResponse = {selectResponse}
        />
    );




    function nextQuestion() {
        let tabGood = reponses.filter(r => r.solution == 1).map(r => r.id);
        mesReponses.sort();

        if(mesReponses.length === tabGood.length && mesReponses.every(function(value, index) { return value === tabGood[index]})){
            console.log('gagné');
            props.calculeScoreEtQuestionSuivante(true);

        }else{
            console.log('perdu');
            props.calculeScoreEtQuestionSuivante(false);


        }

        id = -1;
    }
    let jsxQuestion;
    if(props.video_url != null){
        jsxQuestion =  <QuestionVideo url = {props.video_url}/>
    }
    else{
        jsxQuestion =  <Question question = {props.sentence}/>
    }


    return (
        <div className="AffichageQuestion">
            <div className="LaQuestion">
                <div className="AffichagePoints">{props.score} pts</div>
                {jsxQuestion}
            </div>


            <div className="LesReponses">
                {jsxReponses}
            </div>

            <button onClick={e=>nextQuestion(e)} className="btn_submit">Valider</button>
        </div>
    );
}