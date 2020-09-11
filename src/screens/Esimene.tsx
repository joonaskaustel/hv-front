import React from 'react';
import {useHistory, useParams} from "react-router";

function Esimene() {
    const params = useParams();
    console.log('params ', params)

    localStorage.setItem('user', JSON.stringify(params));

    const history = useHistory();


    history.push("/");


    return (
        <React.Fragment>
            Esimene
        </React.Fragment>
    );
}

export default Esimene;