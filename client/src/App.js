import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import HomePage from "./components/HomePage";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" component={HomePage} exact={true} />
                    <Route path="/:id" component={HomePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
