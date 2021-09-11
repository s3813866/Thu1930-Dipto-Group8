import React, { Component } from 'react'
import PropTypes from "prop-types";
import {createBook} from "../actions/bookActions";
import {connect} from "react-redux";



class AddBook extends Component {
    constructor(){
        super();

        this.state= {
            title: "",
            author: "",
            category: "",
            isbn: "",
            description: "",
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

    onSubmit(e){
        e.preventDefault();
        const newBook = {
            title: this.state.title,
            author: this.state.author,
            category: this.state.category,
            isbn: this.state.isbn,
            description: this.state.description,
        }

        console.log(newBook);
            this.props.createBook(newBook, this.props.history);
    }
    render() {
        const { errors } = this.state;
        return (
            <div className="Person">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Add Book</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg "
                                           placeholder="Book Title"
                                           name="title"
                                           value= {this.state.name}
                                           onChange = {this.onChange}
                                    />

                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Author"
                                           name="author"
                                           onChange = {this.onChange}
                                    />
                                </div>

                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg"
                                   placeholder="Category"
                                   name="category"
                                   onChange = {this.onChange}
                            />
                        </div>


                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="ISBN"
                                           name="isbn"
                                           onChange = {this.onChange}
                                    />
                                </div>


                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder="Book Description"
                                           name = "description"
                                           value= {this.state.description}
                                           onChange = {this.onChange}
                                    />
                                </div>


                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
AddBook.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {createBook}) (AddBook);
