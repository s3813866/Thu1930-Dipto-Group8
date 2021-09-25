import React, { Component } from 'react';
import {Button, Table} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthor} from "../../actions/bookActions";

class Search extends Component {
    constructor() {
        super();

        this.state = {
            search: "",
            author: "",
            title: "",
            category: "",
            errors: {},
            searchType: "titleSearch",
            books: []
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });

        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleClick(e){
        e.preventDefault();
        await this.setState({searchType: e.target.name});
    }

    async onSubmit(e) {
        e.preventDefault();

        if (this.state.searchType === "titleSearch") {
            //have to wait for backend
            // const title = {
            //     title: this.state.title,
            // }
            // const data = await
        }else if (this.state.searchType === "authorSearch") {
            const newAuthor = {
                author: this.state.author,
            }
            console.log("here")
            const data = await this.props.getAuthor(newAuthor, this.props.history);
            this.setState({books: data.slice()})


        } else if (this.state.searchType === "catSearch"){
            //have to wait for backend
        }

    }

    render() {
        const {errors} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Search</h1>
                        <form onSubmit={this.onSubmit} data-testid="SearchForm">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Search..."
                                    name="search"
                                    required
                                    onChange = {this.onChange}
                                />
                            </div>
                            <input onClick={this.handleClick} name="titleSearch" value="Search by Title" className="btn btn-info btn-block mt-3" />{'  '}
                            <input onClick={this.handleClick} name="authorSearch" value="Search by Author" className="btn btn-info btn-block mt-3" />{'  '}
                            <input onClick={this.handleClick} name="catSearch" value="Search by Category" className="btn btn-info btn-block mt-3" />
                            <br/>
                            <br/>
                            <br/>
                            <Button type="submit" variant="outline-primary" >Search</Button>{' '}
                            <br/>
                            <br/>
                            <br/>
                        </form>
                    </div>

                    <h2>Books found</h2>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>View</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.books.map((book => <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                        </tr>))}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {getAuthor})(Search);