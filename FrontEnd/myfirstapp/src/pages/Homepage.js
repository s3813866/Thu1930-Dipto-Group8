import React, {Component} from "react";
import bookstore from "./library.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardGroup, Container} from "react-bootstrap";
import {Button} from "react-bootstrap";
import SingleBook from "./single-red-book-isolated-white-background-113636020.jpg";

const books = [
    "Book 1",
    "Book 2",
    "Book 3",
    "Book 4"
];

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

function CardBook(){
    return (
        <CardGroup>
            {books.map((book => <Card>
                <Card.Img variant="top" src={SingleBook}/>
                <Card.Body>
                    <Card.Title>{book}</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card> ))}
        </CardGroup>
    )
}

function CardBodyMid(){
    return (
        <Container>
            <br/>
            <br/>
            <br/>
            <h2>Recommended Books</h2>
            <br/>
            <hr/>
            <br/>
            <CardBook />

            <br/>
            <br/>
            <br/>
            <br/>

            <h2>Critic's Choice</h2>
            <br/>
            <hr/>
            <br/>
            <CardBook />

        </Container>
    )
}

class homePage extends Component {
    render() {
        return (
            <div className="title">
                <UpperBody />
                <CardBodyMid />
            </div>
        )
    }
}

export default homePage;