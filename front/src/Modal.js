import React, {useEffect, useState} from "react";

export default function Modal(props) {
    if(!props.display)  return null;

    else
        return (
            <div id="modal" className="modal">

                <div className="modal-content">

                    <span id="cancel" onClick={e => props.changeDisplayModal(e)}>x</span>
                    <form>
                        <input type="text" name="filter" className="champs_recherche"/>
                        <input type="submit" value="Rechercher" className="btn_submit"/>
                    </form>
                </div>
            </div>
        );
}