import React, { Component } from 'react';
import {Button, Card, ListGroup, ListGroupItem, Table} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAuthor, getCategory, getTitle} from "../../actions/bookActions";
import MuiAlert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import Grid from "@material-ui/core/Grid";
import SingleBook from "../Images/single-red-book-isolated-white-background-113636020.jpg";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class Search extends Component {
    constructor() {
        super();

        this.state = {
            alertState: false,
            search: "",
            author: "",
            title: "",
            category: "",
            errors: {},
            searchType: "title",
            books: [],
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleBookButton = this.handleBookButton.bind(this);
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

    async handleBookButton(e){
        const find = this.state.books.find(({id}) => id === parseInt(e.target.name))
        console.log(find.id)
        localStorage.setItem("BookClickedOn", JSON.stringify(find.id));
    }

    async handleClose(){
        await this.setState({alertState: false})
    }

    async handleClick(e){
        e.preventDefault();
        await this.setState({searchType: e.target.name});
    }

    async onSubmit(e) {
        e.preventDefault();

        if (this.state.searchType === "title") {
            //have to wait for backend
            const title = {
                title: this.state.title,
            }
            // console.log(title.title);
            const data = await this.props.getTitle(title, this.props.history);
            if(data){
                this.setState({books: data.slice()})
                this.setState({alertState: true})
            }
            else{
                this.setState({alertState: true})
            }

        }else if (this.state.searchType === "author") {
            const newAuthor = {
                author: this.state.author
            }
            const data = await this.props.getAuthor(newAuthor, this.props.history);
            if(data){
                this.setState({books: data.slice()})
                this.setState({alertState: true})
            }
            else{
                this.setState({alertState: true})
            }

        } else if (this.state.searchType === "category"){
            const category = {
                category: this.state.category,
            }

            console.log(category.category);
            const data = await this.props.getCategory(category, this.props.history);

            if(data){
                this.setState({books: data.slice()})
                this.setState({alertState: true})
            }
            else{
                this.setState({alertState: true})
            }
        }

    }

    render() {
        const {errors} = this.state;
        return (
            <>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Search</h1>
                        <form onSubmit={this.onSubmit} data-testid="SearchForm">
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg"
                                       placeholder="Author"
                                       name={this.state.searchType}
                                       onChange={this.onChange}
                                />
                            </div>
                            <input onClick={this.handleClick} name="title" value="Search by Title" className="btn btn-info btn-block mt-3" />{'  '}
                            <input onClick={this.handleClick} name="author" value="Search by Author" className="btn btn-info btn-block mt-3" />{'  '}
                            <input onClick={this.handleClick} name="category" value="Search by Category" className="btn btn-info btn-block mt-3" />
                            <br/>
                            <br/>
                            <br/>
                            <Button type="submit" variant="outline-primary" >Search</Button>{' '}
                            <br/>
                            <br/>
                            <p>Searching by {this.state.searchType}</p>
                            <br/>
                        </form>
                    </div>

                    <h2>Books found</h2>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {this.state.books.map((book =>
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
                </div>
            </div>
                <Snackbar open={this.state.alertState} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
                        Book found!
                    </Alert>
                </Snackbar>
            </>
        )
    }
}

Search.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {getAuthor, getTitle, getCategory})(Search);