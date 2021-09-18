import React, {Component} from 'react'
import PropTypes from "prop-types";
import {getBook} from "../actions/bookActions";
import MsgAlerts from "./Test"
import {connect} from "react-redux";
import {Container} from "@material-ui/core";
import {Table} from "react-bootstrap";

const booksin = []

class BookListing extends Component {
    constructor(){
        super();

        this.state= {
            id: "",
        };

        this.onSubmit = this.onSubmit.bind(this);

    }

    async onSubmit(e){
        this.setState({[e.target.name]: e.target.value});
        e.preventDefault();


        const data = await this.props.getBook();

        console.log(data);
        booksin.splice(0, booksin.length)
        data.forEach(book => {
            console.log(book)
            booksin.push(book)
        })

    }

    render() {
        const { errors } = this.state;
        return (
            <Container>
                <form onSubmit={this.onSubmit}>
                    <input type="submit" value="Show" className="btn btn-primary btn-block mt-4" />
                    <p>Double click the button</p>
                </form>

                <h2 color={"green"}>{"\n"}Books found {"\n"}</h2>
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
                    {booksin.map((book => <tr>
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

export default connect(null, {getBook})(BookListing);
