import React, {Component} from 'react'
import PropTypes from "prop-types";
import {getAllBooks} from "../actions/bookActions";
import {connect} from "react-redux";
import {Container} from "@material-ui/core";
import {Card, ListGroup, ListGroupItem, Table} from "react-bootstrap";
import {Button} from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import SingleBook from "../components/Images/single-red-book-isolated-white-background-113636020.jpg";

// const bookList = []

class BookListing extends Component {
    constructor(){
        super();

        this.state= {
            id: "",
            bookList:[],
            listStatus: "Books Found"
        };

        this.onSubmit = this.onSubmit.bind(this);

    }

    async onSubmit(e){
        e.preventDefault();
        const data = await this.props.getAllBooks();

        if(data){
            this.setState({bookList: data.slice()});
            this.setState({listStatus: "Book found"})
        }
        else{
            this.setState({listStatus: "book not found"})

        }

    }

    render() {
        const { errors } = this.state;
        return (
            <Container>
                <form onSubmit={this.onSubmit}>
                    <Button variant="dark" type="submit">Show</Button>{' '}
                    <p>Double click the button</p>
                </form>


                <h2 color={"green"}>{"\n"}{this.state.listStatus}{"\n"}</h2>
                <br/>
                <br/>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {this.state.bookList.map((book =>
                        <Grid item xs={2} sm={4} md={4} key={book.id}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={SingleBook} />
                                <Card.Body>
                                    <Card.Title>{book.title}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Author: {book.author}</ListGroupItem>
                                    <ListGroupItem>Category: {book.category}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Button href="/BookPage" name={book.id} onClick={this.handleBookButton}>More...</Button>
                                </Card.Body>
                            </Card>
                        </Grid>))}
                </Grid>
            </Container>


        )
    }
}

BookListing.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {getAllBooks})(BookListing);
