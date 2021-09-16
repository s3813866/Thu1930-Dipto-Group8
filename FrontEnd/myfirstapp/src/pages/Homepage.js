import React, {Component} from "react";
import bookstore from "./library.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "@material-ui/core";


function MainBody(){
    return(
        <div>
            <figure className="position-relative">
                <img src={bookstore} alt="Books"/>
                <figcaption>
                    Welcome to Bookeroo!
                </figcaption>
            </figure>


        </div>

    )
}

function textBody(){

}
class homePage extends Component {
    render() {
        return (
            <div className="title">
                <h1 style={{textAlign:"center"}}>Welcome to Bookeroo!</h1>
                <h3 style={{textAlign:"center", position: "relative"}}>Knowledge is power </h3>

                <MainBody />
            </div>
        )
    }
}

export default homePage;