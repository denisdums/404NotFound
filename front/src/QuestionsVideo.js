import React from "react";

function QuestionVideo(props){
    return (


        <video src={props.url} controls loop="true" autoPlay/>

    );
}

export default QuestionVideo;