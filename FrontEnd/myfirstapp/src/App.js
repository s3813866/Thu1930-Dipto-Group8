import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import  {Provider}  from "react-redux";
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
import Enquiry from "./pages/Enquiry";
import ManageEnquiry from "./components/UserManagement/ManageEnquiry";
import BookPage from "./components/BookManagement/BookPage";
import CartSummary from "./components/Cart/CartSummary";
import UserStatus from "./components/UserManagement/UserStatus";

import EditBookForm from "./pages/EditBookForm";

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

            <Switch>
            {/*<Route exact path="/" component={Landing} />*/}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/addBook" component={AddBook} />
            <Route exact path="/bookAdded" component={BookAdded} />
            <Route exact path="/getBookByAuthor" component={GetBookByAuthor} />

            <Route exact path="/home" component={Homepage} />
              <Route exact path="/test" component={CustomizedSnackbars} />
              <Route exact path="/UserStatus" component={UserStatus} />
              <Route exact path="/BookListing" component={BookListing} />
              <Route exact path="/UserRequest" component={UserRequests} />
              <Route exact path="/Enquiry" component={Enquiry} />
              <Route exact path="/ManageEnquiry" component={ManageEnquiry} />
              <Route exact path="/BookPage" component={BookPage} />
              <Route exact path="/CartSummary" component={CartSummary} />

            {/* Edit Book Form*/}
            <Route exact path="/EditBookForm" component={EditBookForm} />


            <Route exact path="/search" component={Search} />


            {/* <Route exact path="/results" component={Search} /> */}

            {
              //Private Routes
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addPerson" component={AddPerson} />
              <Route exact path="" component={PageNotFound} />
            </Switch>

          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;