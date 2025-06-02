import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import styles from "./styles/App.module.css";

import NavBar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";


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
            <Route exact path="/products" render={() => <ProductPage />} />
            <Route exact path="/products/:id" render={() => <ProductDetail />} />
            <Route render={() => <h2>Page not found!</h2>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
