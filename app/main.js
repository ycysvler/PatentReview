import "whatwg-fetch";
import "promise-polyfill/src/polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {Route, Router, Switch} from "react-router-dom";
import BrowserHistory from "./history/browserhistory";
import reducer from "./reducers";
import App from "./app";
import Common from "./common";

const store = createStore(reducer, applyMiddleware(thunk));
const router = (
    <Provider store={store}>
        <Router history={BrowserHistory}>
            <Switch>
                <Route exact path="/signin" component={App}/>
                <Route strict path="/" component={App}/>
            </Switch>
        </Router>
    </Provider>
);
render(router, document.getElementById("root"));