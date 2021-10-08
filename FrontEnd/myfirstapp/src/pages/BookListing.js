import React, {Component} from 'react'
import PropTypes from "prop-types";
import {getAllBooks} from "../actions/bookActions";
import {connect} from "react-redux";
import {Container} from "@material-ui/core";
import {Table} from "react-bootstrap";
import {Button} from "react-bootstrap";

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
            console.log(data);
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
                <Table striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Book Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.bookList.map((book => <tr>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.category}</td>
                    </tr>))}
                    </tbody>
                </Table>
            </Container>


        )
    }
}

BookListing.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {getAllBooks})(BookListing);
