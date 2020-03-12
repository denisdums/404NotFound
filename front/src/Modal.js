import React, {useEffect, useState} from "react";

export default function Modal(props) {

        return (
            <div id="modal" className="modal">

                <div className="modal-content">


                    <form onSubmit={e =>props.filterQuizz(e)}>
                        <input type="text" name="filter" className="champs_recherche"/>
                        <input type="submit" value="Rechercher" className="btn_submit"/>
                    </form>
                </div>
            </div>
        );
}