import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";

import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import AddBook from "./pages/AddBook";
import BookAdded from "./pages/BookAdded";
import GetBookByAuthor from "./pages/getBookByAuthor";
import GetBookById from "./pages/getBookById";
import Search from "./components/BookManagement/Search";
import homePage from "./pages/Homepage";
import PageNotFound from "./pages/404notfound";
import MouseOverPopover from "./pages/Homepage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public Routes
            }

            {/*<Route exact path="/" component={Landing} />*/}
            <switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/addBook" component={AddBook} />
            <Route exact path="/bookAdded" component={BookAdded} />
            <Route exact path="/getBookByAuthor" component={GetBookByAuthor} />
            <Route exact path="/getBookById" component={GetBookById} />
            <Route exact path="/home" component={MouseOverPopover} />
            <Route exact path="/" component={PageNotFound} />

            <Route exact path="/search" component={Search} />
            {/* <Route exact path="/results" component={Search} /> */}

            {
              //Private Routes
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addPerson" component={AddPerson} />
            </switch>

          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;