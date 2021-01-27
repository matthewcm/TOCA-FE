import React from 'react'
import Navbar from "./components/Header";
import Footer from "./components/Footer"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Doc from "./components/Doc";
import Introduction from "./components/Questions/Introduction";

function App() {
    return (
        <Router>
            <Navbar isFat withShadow links={[{label:'Dashboard', link:'/#'},{label:'Documentation', link:'/doc'}]}></Navbar>
            <div className="App" >
                <Switch>
                    <Route
                        exact
                        path={[ "/"]}
                        component={Introduction}
                    />
                    <Route
                        exact
                        path={[ "/dashboard"]}
                        component={Dashboard}
                    />
                    <Route
                        exact
                        path={'/doc'}
                        component={Doc}
                    />
                    <Redirect to={"/"}/>
                </Switch>
            </div>
            <Footer/>

        </Router>
    );
}

export default App;
