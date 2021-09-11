import React, { Component } from 'react'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getBook} from "../actions/bookActions";



class GetBookById extends Component {
    constructor(){
        super();

        this.state= {
            id: "",
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
            id: this.state.id,
        }

        this.props.getBook(newBook, this.props.history);
    }
    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg"
                           placeholder="Book Id "
                           name="id"
                           onChange = {this.onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>

        )
    }
}
GetBookById.propTypes = {
    createProject: PropTypes.func.isRequired
};

export default connect(null, {getBook}) (GetBookById);
