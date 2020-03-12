import React, {useEffect, useState} from "react";
import {HTTP_SERVER_PORT_PICTURES} from "./constants";
import QuizzThumbnail from "./QuizzThumbnail";




export default function UserQuizz(props) {
    return (



                <div className="quizz_card_user">
                    <a className="lien_quizz" href={'quizz/'+ props.id}>
                        <img className="image_quizz" src={HTTP_SERVER_PORT_PICTURES + props.picture} alt="icon"/>
                        <span className="titre_quizz">{props.nameQuizz}</span>
                    </a>
                </div>







    );
}