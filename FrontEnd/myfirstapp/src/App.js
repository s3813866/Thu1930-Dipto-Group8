import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";

import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import AddBook from "./pages/AddBook";
import BookAdded from "./pages/BookAdded";
import GetBookByAuthor from "./pages/getBookByAuthor";
import Search from "./components/BookManagement/Search";
import PageNotFound from "./pages/404notfound";
import Homepage from "./pages/Homepage";
import CustomizedSnackbars from "./pages/Test";
import BookListing from "./pages/BookListing";
import UserRequests from "./components/UserManagement/UserRequests";

import EditBookForm from "./pages/EditBookForm";

import axios from "axios";

async function getUserType(bearerToken) {
  const LINK = `/api/users/type`
  try {
    const res = await axios.get(`${LINK}/${bearerToken}`);

    const retUser = eval(JSON.stringify(res.data));
    console.log("User Type: ");
    console.log(retUser);

    sessionStorage.setItem("userType", retUser);

    return retUser;

  } catch (error) {
    console.log("getUser Error");
  }
};

class App extends Component {
  render() {
    const accountTypeToken = localStorage.getItem("token").replace(/^Bearer\s+/, "");
    console.log(accountTypeToken);
    getUserType(accountTypeToken);
    const accountType = sessionStorage.getItem("userType")

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public Routes
            }

            <Switch>
              {/*<Route exact path="/" component={Landing} />*/}
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/addBook" component={AddBook} />
              <Route exact path="/bookAdded" component={BookAdded} />
              <Route exact path="/getBookByAuthor" component={GetBookByAuthor} />
              {/*not needed for now*/}
              {/*<Route exact path="/getBookById" component={GetBookById} />*/}
              <Route exact path="/home" component={Homepage} />
              <Route exact path="/test" component={CustomizedSnackbars} />
              <Route exact path="/BookListing" component={BookListing} />
              <Route exact path="/UserRequest" component={UserRequests} />

              {/* Edit Book Form*/}
              <Route exact path="/EditBookForm" component={
                (accountType === "ADMIN" || "SELLER") ?
                  () => <EditBookForm /> : () => <Homepage />} />

              <Route exact path="/search" component={Search} />
              {/* <Route exact path="/results" component={Search} /> */}

              {
                //Private Routes
              }
              <Route path="/dashboard" component={
                (accountType === "ADMIN") ? () => <Dashboard /> : () => <Homepage />} />

              <Route path="/addPerson" component={
                (accountType === "ADMIN") ? () => <AddPerson /> : () => <Homepage />} />

              <Route exact path="" component={PageNotFound} />
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;