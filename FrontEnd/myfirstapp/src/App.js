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
import Enquiry from "./pages/Enquiry";
import ManageEnquiry from "./components/UserManagement/ManageEnquiry";
import BookPage from "./components/BookManagement/BookPage";
import CartSummary from "./components/Cart/CartSummary";
import UserStatus from "./components/UserManagement/UserStatus";
import EditBookForm from "./pages/EditBookForm";
import {setUserType} from "./actions/securityActions";


class App extends Component {
  render() {
    const accountType = setUserType();

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
              <Route exact path="/UserStatus" component={UserStatus} />
              <Route exact path="/BookListing" component={BookListing} />
              <Route exact path="/UserRequest" component={UserRequests} />
              <Route exact path="/Enquiry" component={Enquiry} />
              <Route exact path="/ManageEnquiry" component={ManageEnquiry} />
              <Route exact path="/BookPage" component={BookPage} /> {/*Requires fix: Cannot read properties of null (reading 'title')*/}
              <Route exact path="/CartSummary" component={CartSummary} /> {/*Requires fix: null (reading 'reduce') -> Wrap with if statement to check for null*/}

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