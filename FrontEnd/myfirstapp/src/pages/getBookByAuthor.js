import React, { Component } from 'react'
import PropTypes from "prop-types";
import {createBook, getAuthor} from "../actions/bookActions";
import {connect} from "react-redux";



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

    onSubmit(e){
        e.preventDefault();
        const newAuthor = {

            author: this.state.author,
        }

        this.props.getAuthor(newAuthor, this.props.history);
    }
    render() {
        const { errors } = this.state;
        return (
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

        )
    }
}
GetBookByAuthor.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {getAuthor}) (GetBookByAuthor);
