import React from 'react';
import {Route, Switch} from "react-router-dom";
import Teine from 'screens/Teine';
import LinkInput from "./LinkInput";
import Login from "../screens/Login";

function MainRouter() {

    const isUserPresent = localStorage.getItem('user')
    if (!isUserPresent) {
        return <Login/>
    }

    return (
            <Switch>
                <Route path="/">
                    <LinkInput />
                </Route>
                <Route path="/teine">
                    <Teine />
                </Route>
            </Switch>
    );
}

export default MainRouter;