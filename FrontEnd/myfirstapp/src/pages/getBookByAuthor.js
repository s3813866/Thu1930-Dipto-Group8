import React, { Component } from 'react'
import PropTypes from "prop-types";
import {createBook, getAuthor} from "../actions/bookActions";
import {connect} from "react-redux";
import {Container, Table} from "@material-ui/core";

const titles = []

class GetBookByAuthor extends Component {
    constructor(){
        super();

        this.state= {
            author: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
            this.setState ({
                errors: nextProps.errors
            });

        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmit(e){
        e.preventDefault();
        const newAuthor = {

            author: this.state.author,
        }
        const data = await this.props.getAuthor(newAuthor, this.props.history);
        console.log(data)

        titles.splice(0, titles.length)
        data.forEach(book => {
            console.log(book)
            titles.push(book)
        })

    }


    render() {
        const { errors } = this.state;
        return (
            <Container>
                <h2>Search your favourite author</h2>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Author"
                                           name="author"
                                           onChange = {this.onChange}
                                    />
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />

                            </form>

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
                    {titles.map((book => <tr> <td>{book.id}</td>
                                                <td>{book.title}</td>
                                                <td>{book.author}</td>
                                                <td>{book.category}</td></tr>))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}
GetBookByAuthor.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {getAuthor}) (GetBookByAuthor);
