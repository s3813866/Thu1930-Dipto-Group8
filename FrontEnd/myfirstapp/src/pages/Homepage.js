import React, {Component} from "react";
import bookstore from "./library.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "@material-ui/core";


function UpperBody(){
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
                <UpperBody />
            </div>
        )
    }
}

export default homePage;