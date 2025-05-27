import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <Router>
        <NavBar />
        <div className={styles.main}>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/signin" render={() => <SignIn />} />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route render={() => <h2>Page not found!</h2>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
