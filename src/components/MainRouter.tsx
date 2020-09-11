import React from 'react';
import {Route, Switch} from "react-router-dom";
import Teine from 'screens/Teine';
import Esimene from "../screens/Esimene";

function MainRouter() {
    return (
            <Switch>
                <Route path="/login/:type/:token">
                    <Esimene />
                </Route>
                <Route path="/esimene">
                    <Esimene />
                </Route>
                <Route path="/teine">
                    <Teine />
                </Route>
            </Switch>
    );
}

export default MainRouter;