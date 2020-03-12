import React from "react";
import {HTTP_SERVER_PORT_PICTURES} from "./constants";

function QuestionVideo(props){
    return (


        <video src={HTTP_SERVER_PORT_PICTURES+props.url} controls loop="true" autoPlay/>

    );
}

export default QuestionVideo;