import React from "react";

export default function scoreList(props){
    return (
        <div className="score_item">
            <div className="score_item_pseudo">{props.name}</div>
            <div className="score_item_points">{props.score} <span>pts</span></div>
            <div className="score_item_num">{props.classement + 1}</div>
        </div>
    );
}