import React from 'react';
import {Route, Switch} from "react-router-dom";
import GetJwt from "../screens/GetJwt";
import MainRouter from "./MainRouter";

function AuthRouter() {

    return (
            <Switch>
                <Route path="/login/:type/:token">
                    <GetJwt />
                </Route>
               <MainRouter/>
            </Switch>
    );
}

export default AuthRouter;