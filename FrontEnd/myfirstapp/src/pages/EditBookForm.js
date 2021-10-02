import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Create an editBooks Action in bookActions
import { editBook } from "../actions/bookActions";


class EditBookForm extends Component {

    constructor() {
        super();

        this.state = {
            id: "",
            title: "",
            author: "",
            category: "",
            isbn: "",
            description: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const editBook = {
            //id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            category: this.state.category,
            isbn: this.state.isbn,
            description: this.state.description,
        }
        console.log(editBook);
        console.log("Book Edited and Updated in the Database");
        this.props.editBook(editBook, this.props.history, this.state.id);
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="Person">
                <div className="container" data-testid="EditBookForm">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Edit Book Form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit} data-testid="on-submit">
                                <br />

                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg "
                                        data-testid="id-entry"
                                        placeholder="ID"
                                        name="id"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    <br />

                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg "
                                        placeholder="Book Title"
                                        name="title"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    <br />

                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="Author"
                                        name="author"
                                        onChange={this.onChange}
                                    />
                                    <br />
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="Category"
                                        name="category"
                                        onChange={this.onChange}
                                    />
                                    <br />
                                </div>


                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="ISBN"
                                        name="isbn"
                                        onChange={this.onChange}
                                    />
                                    <br />
                                </div>


                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                        placeholder="Book Description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                    />
                                </div>


                                <input type="submit" data-testid="editButton" name="submitEdit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

EditBookForm.propTypes = {
    createProject: PropTypes.func.isRequired
};


// EditBookForm.propTypes = {
//     createProject: PropTypes.func.isRequired

// Update later with editBook Action
export default connect(null, { editBook })(EditBookForm);
export { EditBookForm }